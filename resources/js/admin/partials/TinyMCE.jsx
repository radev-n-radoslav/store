import React, { useRef, useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export const TinyMCE = ({initialValue, getContents}) => {
    const [value, setValue] = useState(initialValue ?? '');
    const editorRef = useRef(null);

    useEffect(() => setValue(initialValue ?? ''), [initialValue]);
    useEffect(() => getContents(value), [value]);

    return (
        <>
            <div className="mb-4">
                <Editor
                    apiKey='6arljrz73tuutlrqug84jfgpa15ejh4ddqjorsrmt9fxeof5'
                    initialValue={initialValue}
                    value={value}
                    onEditorChange={(newValue, editor) => setValue(newValue)}
                    onInit={(evt, editor) => editorRef.current = editor}
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage tableofcontents footnotes mergetags autocorrect',
                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
            </div>
        </>
    );
}
