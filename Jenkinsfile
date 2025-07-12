pipeline {
    agent any

    environment {
        IMAGE_NAME = "lysist/butakane-client"
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        REGISTRY_CREDENTIALS = "dockerhub"
    }

    stages {
        stage('Clone') {
            steps {
                git branch: 'feature/butakane-migrate-client', url: 'https://github.com/shirafzx/butakane-client.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'corepack enable && corepack prepare pnpm@latest --activate'
                sh 'pnpm install'
            }
        }

        stage('Build') {
            steps {
                sh 'pnpm build'
            }
        }

        stage('Docker Build & Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: "$REGISTRY_CREDENTIALS", usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh '''
                        echo "$PASSWORD" | docker login -u "$USERNAME" --password-stdin
                        docker build -t $IMAGE_NAME:$IMAGE_TAG -f ./Dockerfile .
                        docker push $IMAGE_NAME:$IMAGE_TAG
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withEnv(["KUBECONFIG=/var/lib/jenkins/.kube/config"]) {
                    sh '''
                        # Create namespace if not exists
                        kubectl get namespace butakane-dev || kubectl create namespace butakane-dev

                        # Apply deployment resources
                        kubectl apply -f helm/butakane-next/templates/service.yaml --namespace=butakane-dev
                        kubectl apply -f helm/butakane-next/templates/ingress.yaml --namespace=butakane-dev
                        kubectl apply -f helm/butakane-next/templates/deployment.yaml --namespace=butakane-dev

                        # Set new image tag
                        kubectl set image deployment/butakane-web \
                          butakane-web=$IMAGE_NAME:$IMAGE_TAG \
                          --namespace=butakane-dev
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployed: $IMAGE_NAME:$IMAGE_TAG"
        }
        failure {
            echo "❌ Deployment failed."
        }
    }
}
