package com.ujjaval.ecommerce.authenticationservice.controller;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.ujjaval.ecommerce.authenticationservice.entity.UserInfo;
import com.ujjaval.ecommerce.authenticationservice.model.AccountCreationRequest;
import com.ujjaval.ecommerce.authenticationservice.model.AccountCreationResponse;
import com.ujjaval.ecommerce.authenticationservice.model.AuthenticationRequest;
import com.ujjaval.ecommerce.authenticationservice.model.AuthenticationResponse;
import com.ujjaval.ecommerce.authenticationservice.service.AuthDataService;
import com.ujjaval.ecommerce.authenticationservice.service.CustomUserDetailsService;
import com.ujjaval.ecommerce.authenticationservice.util.JwtUtil;
import com.ujjaval.ecommerce.authenticationservice.util.Md5Util;

@RestController
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtTokenUtil;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private AuthDataService authDataService;

    @GetMapping("/test")
    public ResponseEntity<?> test() {
        return ResponseEntity.ok("success");
    }

    @PostMapping("/signup")
    public ResponseEntity<?> createAccount(
            @RequestBody AccountCreationRequest accountCreationRequest)
            throws Exception {

        if (authDataService.findByUsername(accountCreationRequest.getUsername()) != null) {
            return ResponseEntity.ok(
                    new AccountCreationResponse("failure", "Username already exist"));
        }

        if (authDataService.findByEmail(accountCreationRequest.getEmail()) != null) {
            return ResponseEntity.ok(
                    new AccountCreationResponse("failure", "Email already exist"));
        }

        UserInfo userInfo = new UserInfo();
        userInfo.setEmail(accountCreationRequest.getEmail());
        userInfo.setFirstName(accountCreationRequest.getFirstname());
        userInfo.setLastName(accountCreationRequest.getLastname());
        userInfo.setPassword(accountCreationRequest.getPassword());
        userInfo.setUsername(accountCreationRequest.getUsername());

        authDataService.createUserProfile(userInfo);
        return ResponseEntity.ok(new AccountCreationResponse("success", null));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(
            @RequestHeader(value = "Authorization") String headerData) {

        AuthenticationRequest authenticationRequest = new AuthenticationRequest();
        String[] data = headerData.split(" ");
        byte[] decoded = Base64.getDecoder().decode(data[1]);
        String decodedStr = new String(decoded, StandardCharsets.UTF_8);
        data = decodedStr.split(":");

        authenticationRequest.setUsername(data[0]);
        authenticationRequest.setPassword(data[1]);

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
                            Md5Util.getInstance().getMd5Hash(authenticationRequest.getPassword()))
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.ok(new AuthenticationResponse(null, "Incorrect username or password.",
                    null));
        } catch (Exception e) {
            return ResponseEntity.ok(new AuthenticationResponse(null, "Username does not exist.",
                    null));
        }

        final UserDetails userDetails = customUserDetailsService.loadUserByUsername(authenticationRequest.getUsername());

        final String jwt = jwtTokenUtil.generateToken(userDetails);

        UserInfo userInfo = authDataService.findByUsername(authenticationRequest.getUsername());

        return ResponseEntity.ok(new AuthenticationResponse(jwt, null, userInfo.getFirstName()));
    }
}
