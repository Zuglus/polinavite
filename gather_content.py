import os
from fnmatch import fnmatch
from pathlib import Path

EXCLUDED_DIRS = {
    'node_modules', 'dist', '.git', '.vite', 
    'cache', 'build', '__pycache__'
}

EXCLUDED_FILES = {
    'package-lock.json',
    'yarn.lock',
    '.env',
    '.env.local',
    'project_contents.txt',
    'gather_content.py',
    '.DS_Store'  # Добавлен в исключения
}

EXCLUDED_EXTENSIONS = {
    '.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg', 
    '.webp', '.pdf', '.zip', '.exe', '.dll', '.ttf'
}

def is_excluded_path(path: Path) -> bool:
    """Проверяет, должен ли путь быть исключен."""
    # Проверяем каждую часть пути на исключенные директории
    for part in path.parts:
        if part in EXCLUDED_DIRS:
            return True
    return False

def is_excluded_file(file_path: Path) -> bool:
    """Проверяет, должен ли файл быть исключен."""
    return (
        file_path.name in EXCLUDED_FILES or
        file_path.suffix.lower() in EXCLUDED_EXTENSIONS or
        any(fnmatch(file_path.name, pattern) for pattern in EXCLUDED_FILES)
    )

def gather_project_content(output_file: str = 'project_contents.txt') -> None:
    """Собирает содержимое проекта в один файл, пропуская исключенные пути."""
    start_path = Path.cwd()
    output_path = Path(output_file)

    # Удаление предыдущего файла
    try:
        output_path.unlink(missing_ok=True)
    except Exception as e:
        print(f"Ошибка при удалении файла: {e}")
        return

    with open(output_file, 'w', encoding='utf-8') as outfile:
        for path in start_path.rglob('*'):
            # Пропускаем директории и исключенные пути
            if not path.is_file() or is_excluded_path(path) or is_excluded_file(path):
                continue

            try:
                content = path.read_text(encoding='utf-8')
                relative_path = path.relative_to(start_path)
                
                outfile.write(f"\n{'=' * 50}\n")
                outfile.write(f"Файл: {relative_path}\n")
                outfile.write(f"{'=' * 50}\n\n")
                outfile.write(content)
                
            except UnicodeDecodeError:
                print(f"Пропущен бинарный файл: {path}")
            except PermissionError:
                print(f"Нет доступа к файлу: {path}")
            except Exception as e:
                print(f"Ошибка при обработке {path}: {e}")

if __name__ == "__main__":
    gather_project_content()
    print("Файлы проекта собраны в project_contents.txt")