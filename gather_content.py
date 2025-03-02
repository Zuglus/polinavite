import os
from pathlib import Path

def collect_codebase_to_file(source_dir="."):
    """
    Собирает кодовую базу из source_dir в текстовый файл для предоставления ИИ.
    Удаляет предыдущий файл, если он существует, и исключает себя и выходной файл из обработки.
    """
    # Определяем расширения для разных типов файлов
    code_extensions = {'.py', '.js', '.java', '.cpp', '.c', '.h', '.ts', '.html', '.css'}
    media_extensions = {'.jpg', '.png', '.gif', '.bmp', '.svg', '.ttf', '.otf', '.woff', '.woff2', 
                       '.pdf', '.doc', '.docx', '.xls', '.xlsx'}
    ignore_patterns = {'__pycache__', '.git', 'node_modules', 'dist', 'build', '*.egg-info', 
                      'venv', '.venv', '*.pyc', '*.pyo', '*.pyd'}

    output_file = "project_codebase.txt"
    script_file = os.path.basename(__file__)  # Имя текущего скрипта
    
    # Удаляем предыдущий файл, если он существует
    if os.path.exists(output_file):
        os.remove(output_file)
        print(f"Удален предыдущий файл: {output_file}")
    
    with open(output_file, 'w', encoding='utf-8') as outfile:
        outfile.write(f"Project Codebase (Generated on {os.path.basename(os.getcwd())})\n")
        outfile.write("=" * 50 + "\n\n")
        
        # Проходим по всем файлам и директориям
        for root, dirs, files in os.walk(source_dir):
            rel_root = os.path.relpath(root, source_dir)
            
            # Пропускаем игнорируемые директории
            if any(pattern in rel_root for pattern in ignore_patterns):
                continue
                
            for file in files:
                file_path = os.path.join(root, file)
                rel_path = os.path.relpath(file_path, source_dir)
                
                # Пропускаем текущий скрипт и выходной файл
                if file == script_file or file == output_file:
                    continue
                    
                # Пропускаем игнорируемые файлы
                if any(file.endswith(pattern.strip('*')) or pattern in file 
                      for pattern in ignore_patterns):
                    continue
                    
                # Определяем расширение файла
                _, ext = os.path.splitext(file)
                ext = ext.lower()
                
                if ext in code_extensions:
                    # Для кодовых файлов пишем полный контент
                    outfile.write(f"\nFile: {rel_path}\n")
                    outfile.write("-" * 50 + "\n")
                    try:
                        with open(file_path, 'r', encoding='utf-8') as f:
                            content = f.read()
                            outfile.write(content)
                    except Exception as e:
                        outfile.write(f"(Error reading file: {e})\n")
                    outfile.write("\n" + "=" * 50 + "\n")
                    
                elif ext in media_extensions:
                    # Для медиа-файлов и шрифтов только название
                    outfile.write(f"Media/Shrift: {rel_path}\n")
                    
                else:
                    # Для остальных файлов тоже только название
                    outfile.write(f"Other file: {rel_path}\n")

    print(f"Кодовая база собрана в файл: {output_file}")

if __name__ == "__main__":
    collect_codebase_to_file()