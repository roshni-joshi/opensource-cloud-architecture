#!/bin/bash
# Install Docker
sudo yum install -y docker
sudo systemctl start docker
sudo systemctl enable docker

# Install Docker Compose
sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Check Docker Compose version
docker-compose version

# Install Git
sudo yum install -y git

TOKEN=`curl -X PUT "http://169.254.169.254/latest/api/token" -H "X-aws-ec2-metadata-token-ttl-seconds: 21600"`
INSTANCE_IP=`curl http://169.254.169.254/latest/meta-data/local-ipv4 -H "X-aws-ec2-metadata-token: $TOKEN"`

# Clone the repository and start the application
git clone https://github.com/roshni-joshi/opensource-cloud-architecture.git
cd opensource-cloud-architecture
sudo INSTANCE_IP=$INSTANCE_IP docker-compose up -d
