# 🪴 Jodhpuri Furniture — Cloud Deployment Setup

This guide explains how to set up and deploy the **Jodhpuri Furniture** full-stack application (Frontend + Backend) on an Ubuntu EC2 instance using **aaPanel**, **Node.js**, and **MySQL**.

---

## 🚀 Tech Stack

- **Frontend:** Next.js  
- **Backend:** Node.js (Express)  
- **Database:** MySQL (Local / AWS RDS)  
- **Server Panel:** aaPanel  
- **Cloud Provider:** AWS EC2 (Ubuntu)  
- **Node Version:** v18.16.0

---

## 🧩 1. System Update & Basic Tools

```bash
sudo apt-get update
```
```bash
Access from Local Machine Through Winscp
ec2-65-2-29-209.ap-south-1.compute.amazonaws.com > user: Ubuntu > Advance > Auth Add Key
Save > Connect
```
```bash
sudo chmod -777 /ubuntu
upload ./install.sh from local system through winscp
sudo chmod -R 777 ./install.sh
sudo ./install.sh
```
## After installation, aaPanel will show:
```code
aaPanel Internet Address: http://<your-ip>:7800/<token>
username: <generated-username>
password: <generated-password>
```
## 📂 3. Project Folder Setup
```bash
cd /www/wwwroot/
sudo mkdir Jodhpuri
sudo chmod -R 777 Jodhpuri/
cd Jodhpuri/
```
## 📦 5. Project Files Setup
```bash
# Frontend
cd jodhpurifurniture-fe/
unzip jodhpurifurniture-fe.zip

# Backend
cd ../jodhpurifurniture-be/
unzip jodhpurifurniture-be.zip
```
## 🧰 6. Install Node.js (Using NVM)
```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18.16.0
nvm use 18.16.0
nvm alias default 18.16.0

node -v    # Verify Node version
npm -v     # Verify NPM version
```
## ⚡ 7. Environment Variables FrontEnd
```bash
# production iske uppr tak
NEXT_PUBLIC_SERVER_URL ="http://65.2.29.209:4011/api" > Current Server IP 
NEXT_PUBLIC_IMAGE_URL = "http://65.2.29.209:4000/images/"
FACEBOOK_APP_ID="6a7519240"
GOOGLE_CLIENT_ID="256018168919-98ala5tjc34hrhf12.apps.googleusercontent.com"
```
## ⚡ 7. Environment Variables Backend
```bash
DB_HOST=jodhpuri-db.c1cuiwi6cj63.ap-south-1.rds.amazonaws.com
DB_USER=jodhpuri_user
DB_PASSWORD=rnJGBZ57h5iDFziR
DB_NAME=jodhpuri
DB_PORT=3306
PORT=4011
SERVER_URL=http://localhost
NODE_ENV=production

# Razorpay
RZRP_KEY_ID=
RZRP_KEY_SECRET=
# AWS S3 Credentials
AWS_ACCESS_KEY=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET_NAME=jodhpuri-furniture
AWS_BUCKET_POLICY=jodhpuri-furniture-access-policy-s3
AWS_ARN=arn:aws:s3:::jodhpuri-furniture
AWS_REGION=ap-south-1
AWS_IMAGE_URL=https://
# Twilio
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_SERVICE_SID=
```
## Now access URL aapanel
- aaPanel Internet Address: http://65.2.29.209:7800/05456208
- username: ca6tzkk6
- password: 6cf39529
- release the following port (7800|888|80|443|20|21) in the security group > use this which is given on your EC2 instance cmd terminal

## Its a Security Group AWS EC2 Instance 
<img width="1487" height="528" alt="image" src="https://github.com/user-attachments/assets/8c10194d-3891-4d35-a1a4-b2b173d5fc2f" />
<img width="1915" height="391" alt="image" src="https://github.com/user-attachments/assets/1ad1048e-e10c-4ea6-b34f-fb52c634eedf" />


## Its a RDS Security Group 
<img width="1919" height="344" alt="image" src="https://github.com/user-attachments/assets/7f9815cc-6e2a-4e8c-9143-d0f77106f268" />
<img width="1919" height="642" alt="image" src="https://github.com/user-attachments/assets/a3433228-fae2-40aa-8bb0-e9fe60ed49fe" /> 

## Install Node Model 
<img width="1916" height="510" alt="image" src="https://github.com/user-attachments/assets/3403e762-d7ef-48c3-868c-47002f81afd1" />
<img width="1917" height="385" alt="image" src="https://github.com/user-attachments/assets/f60cceba-161f-4c6c-a15f-695c8b620e7e" />
<img width="1432" height="389" alt="image" src="https://github.com/user-attachments/assets/411d506f-7b54-4f58-b407-0023f4965486" />
<img width="1919" height="549" alt="image" src="https://github.com/user-attachments/assets/0ba3642a-88ab-436d-9c4e-8e4fe0551279" />
<img width="1918" height="945" alt="image" src="https://github.com/user-attachments/assets/c59d85ee-38f3-401e-8de7-1d8ee25c5937" />
<img width="1702" height="359" alt="image" src="https://github.com/user-attachments/assets/ae79a3ca-3aef-43f6-92aa-61006b6a28fb" />
<img width="1913" height="615" alt="image" src="https://github.com/user-attachments/assets/a9fd0835-6f48-41ae-87af-561405a63958" />
<img width="1919" height="520" alt="image" src="https://github.com/user-attachments/assets/a77cf6ef-b175-4883-a1df-7248c5f97c86" />
<img width="1919" height="764" alt="image" src="https://github.com/user-attachments/assets/28c65522-0d66-4330-b0bb-f38935a922f7" />
<img width="1919" height="653" alt="image" src="https://github.com/user-attachments/assets/c47a89b2-a187-443e-a5d0-816302e72e97" />
<img width="1919" height="752" alt="image" src="https://github.com/user-attachments/assets/97e8d28f-ded1-4f96-ba66-3d061c707575" />

## RDS Configuration
<img width="1918" height="604" alt="image" src="https://github.com/user-attachments/assets/e6c77845-c640-416f-bb3d-6dc59e10829a" />
<img width="1644" height="254" alt="image" src="https://github.com/user-attachments/assets/3254b728-985b-4af5-b105-1f24799d2d18" />
<img width="1919" height="933" alt="image" src="https://github.com/user-attachments/assets/f2268f6d-6573-4afd-8930-411efcbc7d17" />
<img width="1918" height="981" alt="image" src="https://github.com/user-attachments/assets/4441a342-92a7-4ca0-b310-0efa4fe37372" />













