import React from 'react';

import { useQuill } from 'react-quilljs';

import 'quill/dist/quill.snow.css'; // Add css for snow theme

export default function AddBlogs({ innerHTML, getDescription }) {
    const { quill, quillRef } = useQuill();

    // console.log(quill); // undefined > Quill Object
    // console.log(quillRef); // { current: undefined } > { current: Quill Editor Reference }

    React.useEffect(() => {
        if (quill) {
            quill.clipboard.dangerouslyPasteHTML(innerHTML);
            quill.on('text-change', (delta, oldDelta, source) => {
                getDescription(quill.root.innerHTML);
                // console.log('Text change!');
                // console.log(quill.getText()); // Get text only
                // console.log(quill.getContents()); // Get delta contents
                // console.log(quill.root.innerHTML); // Get innerHTML using quill
                // console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
            });
        }
    }, [quill]);

    return (
        <>
            <div className="w-full h-[300px] mb-10">
                <div ref={quillRef} />
            </div>
        </>
    );
}
