import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { type ILexicalRendererProps } from "../../../types/LexicalRenderer.Interface";

// Questo componente mi serve per andare a trasfomrare il JSON che trova nel TOKEN e trasformarlo in testo leggibile
// usando le regole della libreria lexical/react

// Il TEMA serve a dire a Lexical quali classi Tailwind usare per i vari stili
const theme = {
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
  },
  paragraph: "mb-2",
};

const LexicalRenderer = ({ descrizioneFormattata }: ILexicalRendererProps) => {
  // Se non ci sono dati, non inizializziamo la libreria per evitare problemi
  if (!descrizioneFormattata) return null;
  // Configurazione ufficiale richiesta dalla libreria
  const initialConfig = {
    namespace: "Renderer",
    theme,
    // La libreria vuole lo stato come stringa JSON
    editorState: JSON.stringify(descrizioneFormattata),
    readOnly: true, 
    onError: (error: Error) => console.error(error),
    nodes: [],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={<ContentEditable className="outline-none pointer-events-none" />}
        placeholder={null}
        ErrorBoundary={LexicalErrorBoundary}
      />
    </LexicalComposer>
  );
};

export default LexicalRenderer;