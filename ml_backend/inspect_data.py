import os
root = 'ml_backend/data'
print('Dataset root:', os.path.abspath(root))
if not os.path.exists(root):
    print('Root does not exist')
else:
    classes = [d for d in os.listdir(root) if os.path.isdir(os.path.join(root,d))]
    print('Found classes:', len(classes))
    for c in classes:
        cpath = os.path.join(root,c)
        files = [f for f in os.listdir(cpath) if f.lower().endswith(('.png','.jpg','.jpeg'))]
        print(f'{c} -> {len(files)} files (sample: {files[:3]})')
