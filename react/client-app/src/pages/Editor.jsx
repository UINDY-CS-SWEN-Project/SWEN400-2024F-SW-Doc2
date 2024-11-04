import { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import {
	ClassicEditor,
	AccessibilityHelp,
	AutoLink,
	Autosave,
	Bold,
	Essentials,
	Heading,
	Indent,
	IndentBlock,
	Italic,
	Link,
	List,
	Paragraph,
	SelectAll,
	Title,
	TodoList,
	Underline,
	Undo
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

import './Editor.css';

export default function Editor() {
	const editorContainerRef = useRef(null);
	const editorRef = useRef(null);
	const [isLayoutReady, setIsLayoutReady] = useState(false);
	const [docTitle, setDocTitle] = useState('');
	useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);

	const editorConfig = {
		toolbar: {
			items: [
				'undo',
				'redo',
				'|',
				'heading',
				'|',
				'bold',
				'italic',
				'underline',
				'|',
				'link',
				'|',
				'bulletedList',
				'numberedList',
				'todoList',
				'outdent',
				'indent'
			],
			shouldNotGroupWhenFull: false
		},
		plugins: [
			AccessibilityHelp,
			AutoLink,
			Autosave,
			Bold,
			Essentials,
			Heading,
			Indent,
			IndentBlock,
			Italic,
			Link,
			List,
			Paragraph,
			SelectAll,
			Title,
			TodoList,
			Underline,
			Undo
		],
		heading: {
			options: [
				{
					model: 'paragraph',
					title: 'Paragraph',
					class: 'ck-heading_paragraph'
				},
				{
					model: 'heading1',
					view: 'h1',
					title: 'Heading 1',
					class: 'ck-heading_heading1'
				},
				{
					model: 'heading2',
					view: 'h2',
					title: 'Heading 2',
					class: 'ck-heading_heading2'
				},
				{
					model: 'heading3',
					view: 'h3',
					title: 'Heading 3',
					class: 'ck-heading_heading3'
				},
				{
					model: 'heading4',
					view: 'h4',
					title: 'Heading 4',
					class: 'ck-heading_heading4'
				},
				{
					model: 'heading5',
					view: 'h5',
					title: 'Heading 5',
					class: 'ck-heading_heading5'
				},
				{
					model: 'heading6',
					view: 'h6',
					title: 'Heading 6',
					class: 'ck-heading_heading6'
				}
			]
		},
		initialData:
			'<h2></h2>\n<p></p>\n',
		link: {
			addTargetToExternalLinks: true,
			defaultProtocol: 'https://',
			decorators: {
				toggleDownloadable: {
					mode: 'manual',
					label: 'Downloadable',
					attributes: {
						download: 'file'
					}
				}
			}
		},
		placeholder: 'Type or paste your content here!'
	};

	const handleSave = () => {
		if (editorRef.current) {
			const userID = localStorage.getItem('username')
			const data = editorRef.current.editor.getData();
			const dataToSend = {
				username: userID,
				title: docTitle,
				content: data,
			}
			console.log(JSON.stringify(dataToSend)); 
			fetch('http://localhost:9091/api/saveText', {
				method: 'POST',
				headers: {
				  'Content-Type': 'application/json',
				},
				body: JSON.stringify(dataToSend),
			  })
				.then(response => response.json())
				.then(data => {
				  alert("Text saved succesfully")
				})
				.catch((error) => {
				  console.error('Error:', error);
				  alert("Error, did not save text")
				});
		}
	};

	const handleInputChange = (e) => setDocTitle(e.target.value);

	return (
		<div>
			<div className="main-container">
				<div className="editor-container editor-container_classic-editor" ref={editorContainerRef}>
					<div className="editor-container__editor">
						<div ref={editorRef}>
							{isLayoutReady && (
								<CKEditor
									editor={ClassicEditor}
									config={editorConfig}
									onReady={(editor) => (editorRef.current = { editor })}
								/>
							)}
						</div>
					</div>
				</div>
				<input
					type="text"
					id="docTitle"
					name="docTitle"
					value={docTitle}
					onChange={handleInputChange}
					placeholder="Document Title"
            	/>
				<button onClick={handleSave}>Save</button>
			</div>
		</div>
	);
}
