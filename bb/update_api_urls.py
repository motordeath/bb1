import re

files_to_update = [
    'src/components/CreateProjectModal.jsx',
    'src/components/AuthCard.jsx',
    'src/context/AuthContext.jsx',
    'src/pages/Profile.jsx',
    'src/pages/Home.jsx',
    'src/pages/ProjectDetails.jsx'
]

for file_path in files_to_update:
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Check if API_BASE_URL import already exists
    if 'import API_BASE_URL' not in content:
        # Add import after the first import line
        lines = content.split('\n')
        for i, line in enumerate(lines):
            if line.strip().startswith('import '):
                # Insert after this line
                lines.insert(i+1, "import API_BASE_URL from '../config/api';")
                break
        content = '\n'.join(lines)
    
    # Replace 'http://localhost:5000 with `${API_BASE_URL}
    content = re.sub(r"'http://localhost:5000", r"\`\${API_BASE_URL}", content)
    content = re.sub(r'"http://localhost:5000', r'`${API_BASE_URL}', content)
    
    with open(file_path, 'w') as f:
        f.write(content)
    
    print(f"Updated {file_path}")

print("\nAll files updated successfully!")
