import os
from fnmatch import fnmatch

EXCLUDED_DIRS = {'node_modules', 'dist', '.git', '.vite', 'cache', 'build'}
EXCLUDED_FILES = {
    'package-lock.json',
    'yarn.lock',
    '.env',
    '.env.local',
    'project_contents.txt',  # Исключаем сам файл вывода
    'gather_content.py'      # Исключаем только этот скрипт
}
EXCLUDED_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg', 
                      '.webp', '.pdf', '.zip', '.exe', '.dll', '.ttf'}

def gather_project_content(output_file: str = 'project_contents.txt'):
    start_dir = os.getcwd()

    # Удаление предыдущего файла
    if os.path.exists(output_file):
        try:
            os.remove(output_file)
            print(f"Удален предыдущий файл: {output_file}")
        except Exception as e:
            print(f"Ошибка удаления файла: {str(e)}")
            return 
    
    with open(output_file, 'w', encoding='utf-8') as outfile:
        for root, dirs, files in os.walk(start_dir, topdown=True):
            # Фильтруем директории для обхода
            dirs[:] = [d for d in dirs if d not in EXCLUDED_DIRS]
            
            for file in files:
                file_path = os.path.join(root, file)
                
                # Полноценная проверка по полному имени и расширению
                is_excluded = (
                    file in EXCLUDED_FILES or
                    any(fnmatch(file, pattern) for pattern in EXCLUDED_FILES) or 
                    os.path.splitext(file)[1].lower() in EXCLUDED_EXTENSIONS
                )
                
                if is_excluded:
                    continue
                
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                except (UnicodeDecodeError, PermissionError) as e:
                    print(f"Пропущен файл {file_path}: {str(e)}")
                    continue

                # Форматирование вывода
                outfile.write(f"\n\n{'=' * 50}\n")
                outfile.write(f"Файл: {os.path.relpath(file_path, start_dir)}\n")
                outfile.write(f"{'=' * 50}\n\n")
                outfile.write(content)

if __name__ == "__main__":
    gather_project_content()
    print("Файлы проекта собраны в project_contents.txt")