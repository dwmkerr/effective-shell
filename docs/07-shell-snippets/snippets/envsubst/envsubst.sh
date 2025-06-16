# First create a template.
cat <<EOF > secret.template.yaml
apiVersion: v1
kind: Secret
metadata:
  name: my-secret
type: Opaque
data:
  username: \${USERNAME}
  password: \${PASSWORD}
EOF

# Demo is better in colors. This is the template above but from bat.
alias cat="bat --plain --theme base16 --force-colorization --language yaml" && clear

# Let's check how this looks.
cat secret.template.yaml

# Now demo substitute env vars. Pipe into cat for colors.
USERNAME=developer PASSWORD=123 envsubst < config.template.yaml | cat

# Demo:

# Setup
source ./init.sh

# Show secret.
bat secret.template.yaml

# Show env.
bat .env

# Show subsitution.
source .env
envsubst < secret.template.yaml

# Show more.
PASSWORD=123 envsubst < secret.template.yaml
