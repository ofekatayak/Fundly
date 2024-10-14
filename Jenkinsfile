ֱpipeline {
    agent any

    environment {
        DOCKER_IMAGE = "fundly"
        DOCKER_TAG = "latest"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Docker Build') {
            steps {
                
                sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
            }
        }
        stage('Unit test') {
            steps {
                
               sh 'docker run --rm fundly npx jest'
            }
        }
        

        
    }

    post {
        always {
            // Clean up workspace after build
            cleanWs()
        }
    }
}
