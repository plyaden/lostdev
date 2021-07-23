import os
import importlib
import zipfile
    
def zipdir(path, out_path, timestamp=None):
    # zipf is zipfile handle
    zipf = zipfile.ZipFile(out_path, 'w', zipfile.ZIP_DEFLATED)
    for root, dirs, files in os.walk(path):
        for file in files:
            src = os.path.join(root, file)
            if timestamp is None:
                dst = os.path.relpath(os.path.join(root, file), 
                                        os.path.join(path, '..'))
            else:
                dst = os.path.relpath(os.path.join(f'{root}_{timestamp}', file), 
                                        os.path.join(path, '..'))
            zipf.write(src, dst)
    zipf.close()

def import_by_string(full_name):
    module_name, unit_name = full_name.rsplit('.', 1)
    mod = importlib.import_module(module_name)
    return getattr(mod, unit_name)

def exec_dyn_class(idx, class_name):
    my_class = import_by_string(class_name)
    instance = my_class(idx)
    return instance._run()

def get_import_name_by_script(script_name, timestamp=None):
    mod_name = os.path.splitext(script_name)[0]
    if timestamp is not None:
        mod_list = mod_name.split('.')
        mod_list[0] = f'{mod_list[0]}_{timestamp}'
        mod_name = '.'.join(mod_list)
    return f'{mod_name}.LostScript'
