node('nodejs') {
    stage('Build Artifact') {
        checkout scm
        sh 'npm install'
        sh 'npm run build -- --prod'
        stash name: "artifact", includes: "dist"
    }
    stage('Build Image') {
        unstash name: "artifact"
        sh "cp ./Dockerfile target/Dockerfile"
        sh "oc start-build talking-statues-admin-build --from-dir=target"
    }
}