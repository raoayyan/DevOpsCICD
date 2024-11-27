# **First step:**

#  Setup K8-Cluster using kubeadm [K8 Version-->1.28.1]

### 1. Update System Packages [On Master & Worker Node]

```bash
sudo apt-get update
```

### 2. Install Docker[On Master & Worker Node]

```bash
sudo apt install docker.io -y
sudo chmod 666 /var/run/docker.sock
```

### 3. Install Required Dependencies for Kubernetes[On Master & Worker Node]

```bash
sudo apt-get install -y apt-transport-https ca-certificates curl gnupg
sudo mkdir -p -m 755 /etc/apt/keyrings
```

### 4. Add Kubernetes Repository and GPG Key[On Master & Worker Node]

```bash
curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.28/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.28/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list
```

### 5. Update Package List[On Master & Worker Node]

```bash
sudo apt update
```

### 6. Install Kubernetes Components[On Master & Worker Node]

```bash
sudo apt install -y kubeadm=1.28.1-1.1 kubelet=1.28.1-1.1 kubectl=1.28.1-1.1
```

### 7. Initialize Kubernetes Master Node [On MasterNode]

```bash
sudo kubeadm init --pod-network-cidr=10.244.0.0/16
```

### 8. Configure Kubernetes Cluster [On MasterNode]

```bash
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

### 9. Deploy Networking Solution (Calico) [On MasterNode]

```bash
kubectl apply -f https://docs.projectcalico.org/manifests/calico.yaml
```

### 10. Deploy Ingress Controller (NGINX) [On MasterNode]

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.49.0/deploy/static/provider/baremetal/deploy.yaml
```


![image](https://github.com/user-attachments/assets/bf226915-e1e2-4654-a3cb-f9ac732997d6)



# SetUp SonarQube

```bash
#!/bin/bash

# Update package manager repositories
sudo apt-get update

# Install necessary dependencies
sudo apt-get install -y ca-certificates curl

# Create directory for Docker GPG key
sudo install -m 0755 -d /etc/apt/keyrings

# Download Docker's GPG key
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc

# Ensure proper permissions for the key
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add Docker repository to Apt sources
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
$(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update package manager repositories
sudo apt-get update

sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin 
```

Save this script in a file, for example, `install_docker.sh`, and make it executable using:

```bash
chmod +x install_docker.sh
```

Then, you can run the script using:

```bash
./install_docker.sh
```

## Create Sonarqube Docker container
To run SonarQube in a Docker container with the provided command, you can follow these steps:

1. Open your terminal or command prompt.

2. Run the following command:

```bash
docker run -d --name sonar -p 9000:9000 sonarqube:lts-community
```

This command will download the `sonarqube:lts-community` Docker image from Docker Hub if it's not already available locally. Then, it will create a container named "sonar" from this image, running it in detached mode (`-d` flag) and mapping port 9000 on the host machine to port 9000 in the container (`-p 9000:9000` flag).

3. Access SonarQube by opening a web browser and navigating to `http://VmIP:9000`.

This will start the SonarQube server, and you should be able to access it using the provided URL. If you're running Docker on a remote server or a different port, replace `localhost` with the appropriate hostname or IP address and adjust the port accordingly.


## Create Nexus using docker container

To create a Docker container running Nexus 3 and exposing it on port 8081, you can use the following command:

```bash
docker run -d --name nexus -p 8081:8081 sonatype/nexus3:latest
```

This command does the following:

- `-d`: Detaches the container and runs it in the background.
- `--name nexus`: Specifies the name of the container as "nexus".
- `-p 8081:8081`: Maps port 8081 on the host to port 8081 on the container, allowing access to Nexus through port 8081.
- `sonatype/nexus3:latest`: Specifies the Docker image to use for the container, in this case, the latest version of Nexus 3 from the Sonatype repository.

After running this command, Nexus will be accessible on your host machine at http://IP:8081.

## Get Nexus initial password
Your provided commands are correct for accessing the Nexus password stored in the container. Here's a breakdown of the steps:

1. **Get Container ID**: You need to find out the ID of the Nexus container. You can do this by running:

    ```bash
    docker ps
    ```

    This command lists all running containers along with their IDs, among other information.

2. **Access Container's Bash Shell**: Once you have the container ID, you can execute the `docker exec` command to access the container's bash shell:

    ```bash
    docker exec -it <container_ID> /bin/bash
    ```

    Replace `<container_ID>` with the actual ID of the Nexus container.

3. **Navigate to Nexus Directory**: Inside the container's bash shell, navigate to the directory where Nexus stores its configuration:

    ```bash
    cd sonatype-work/nexus3
    ```

4. **View Admin Password**: Finally, you can view the admin password by displaying the contents of the `admin.password` file:

    ```bash
    cat admin.password
    ```

5. **Exit the Container Shell**: Once you have retrieved the password, you can exit the container's bash shell:

    ```bash
    exit
    ```

This process allows you to access the Nexus admin password stored within the container. Make sure to keep this password secure, as it grants administrative access to your Nexus instance.





## Installing Jenkins on Ubuntu


```bash
#!/bin/bash
sudo apt update && sudo apt upgrade -y
# Install OpenJDK 17 JRE Headless
sudo apt install openjdk-17-jre-headless -y

# Download Jenkins GPG key
sudo wget -O /usr/share/keyrings/jenkins-keyring.asc \
  https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key

# Add Jenkins repository to package manager sources
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null

# Update package manager repositories
sudo apt-get update

# Install Jenkins
sudo apt-get install jenkins -y
```

Save this script in a file, for example, `install_jenkins.sh`, and make it executable using:

```bash
chmod +x install_jenkins.sh
```

Then, you can run the script using:

```bash
./install_jenkins.sh
```

This script will automate the installation process of OpenJDK 17 JRE Headless and Jenkins.


## Install docker for future use

```bash
#!/bin/bash

# Update package manager repositories
sudo apt-get update

# Install necessary dependencies
sudo apt-get install -y ca-certificates curl

# Create directory for Docker GPG key
sudo install -m 0755 -d /etc/apt/keyrings

# Download Docker's GPG key
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc

# Ensure proper permissions for the key
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add Docker repository to Apt sources
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
$(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update package manager repositories
sudo apt-get update

sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin 
```

Save this script in a file, for example, `install_docker.sh`, and make it executable using:

```bash
chmod +x install_docker.sh
```

Then, you can run the script using:

```bash
./install_docker.sh
```
