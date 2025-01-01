const fs = require('fs');
const path = require('path');

const projectRoot = './'; // Укажите корень проекта

function updateFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      updateFiles(filePath);
    } else if (file.endsWith('.component.ts')) {
      let content = fs.readFileSync(filePath, 'utf-8');

      // Проверяем, есть ли уже стратегия обнаружения изменений
      if (
        !content.includes('changeDetection: ChangeDetectionStrategy.OnPush')
      ) {
        // Импортируем ChangeDetectionStrategy, если его нет
        if (!content.includes('ChangeDetectionStrategy')) {
          content = content.replace(
            /@Component\({/,
            `import { ChangeDetectionStrategy } from '@angular/core';\n\n@Component({`
          );
        }

        // Добавляем стратегию в @Component с проверкой на запятую
        content = content.replace(
          /@Component\(\{([\s\S]*?)\}/,
          (_, properties) => {
            // Убираем лишнюю запятую, если есть
            const cleanedProperties = properties.trim().replace(/,$/, '');
            return `@Component({${cleanedProperties},\n  changeDetection: ChangeDetectionStrategy.OnPush\n}`;
          }
        );

        // Сохраняем изменения
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated: ${filePath}`);
      }
    }
  }
}

updateFiles(projectRoot);
