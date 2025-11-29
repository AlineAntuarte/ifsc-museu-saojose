import crypto from 'node:crypto'; // Módulo nativo do Node.js
import fs from 'node:fs/promises';
import path from 'node:path';

export async function saveLocalFile(
  file: File,
  folder: string,
): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Gera um ID único sem precisar instalar bibliotecas externas
  const uniqueId = crypto.randomUUID();

  const fileName = `${uniqueId}-${file.name.replace(/\s/g, '-')}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);

  try {
    await fs.access(uploadDir);
  } catch {
    await fs.mkdir(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, fileName);
  await fs.writeFile(filePath, buffer);

  return `/uploads/${folder}/${fileName}`;
}

export async function deleteLocalFile(fileUrl: string) {
  if (!fileUrl) return;
  // Removemos possíveis query params e garantimos o caminho
  const cleanUrl = fileUrl.split('?')[0];
  const filePath = path.join(process.cwd(), 'public', cleanUrl);

  try {
    await fs.unlink(filePath);
  } catch (error) {
    // Se o arquivo não existir, apenas ignoramos o erro
    console.error(
      'Aviso: Arquivo não encontrado para deletar ou erro de permissão:',
      error,
    );
  }
}
