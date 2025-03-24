import { getBoilerplateById } from '@/lib/api';
import CodeWrapper from './code-wrapper';

interface EditorPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function EditorPage({ params }: EditorPageProps) {
    const { slug } = await params;
    const { language, boilerplate } = await getBoilerplateById(slug);

  return (
    <CodeWrapper boilerplate={boilerplate} />
  );
}