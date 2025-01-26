file_path="$HOME/effective-shell/templates/advanced.template.sh"
env_var_names=$(env | sed -E -n 's/^([^=]+)(=.*)/\1/p')

for env_var_name in ${env_var_names}; do
    echo "Checking for '${env_var_name}'..."

    if grep -q "%${env_var_name}%" "${file_path}"; then
        echo "-> Found '${env_var_name}', expanding now..."

        env_var_value="${!env_var_name}"
        escaped_value=$(echo ${env_var_value} | sed -e 's/[\/&]/\\&/g')

        sed -e "s/%${env_var_name}%/${escaped_value}/" \
            "${file_path}" > "${file_path}.tmp"
        mv "${file_path}.tmp" "${file_path}"
    fi
done
