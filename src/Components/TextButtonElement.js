import { useContext, useRef } from 'react';
import { CanvasContext } from '../App';
import ReactQuill from 'react-quill';
import parse from 'html-react-parser';
import '../Assets/Styles/TextButtonElement.css';

export default function TextButtonElement(props) {
	const { actions } = useContext(CanvasContext);
	const { content, id, readOnly } = props;
	const editorRef = useRef(null);

	const modules = {
		toolbar: false,
	};

	const updateEditorValue = (value) => {
		actions.updateCanvasData({ id, content: value });
	};

	if (readOnly) {
		return (
			<div
				className='quill-container'
				style={{ padding: 0, border: 'solid' }}
			>
				{parse(content)}
			</div>
		);
	} else {
		return (
			<ReactQuill
				ref={editorRef}
				className='quill-container'
				readOnly={readOnly}
				modules={modules}
				value={content}
				onChange={updateEditorValue}
			></ReactQuill>
		);
	}
}
