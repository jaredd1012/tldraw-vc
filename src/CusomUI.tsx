import { TLGeoShape, createShapeId, useEditor } from "@tldraw/tldraw";
import { useEffect, useState } from "react";
import { track } from "signia-react";

export const CustomUi = track(() => {
	const editor = useEditor();
	const [toolId, setToolId] = useState('select');
	const generateRandomId = (length: number) => {
		let id = '';
		for (let i = 0; i < length; i++) {
		  id += Math.floor(Math.random() * 10); // Generates a random digit (0-9)
		}
		return id;
	};

	const createCustomShape = () => {
		const id = generateRandomId(3)
		editor.createShapes<TLGeoShape>([
		{
			id: createShapeId(id),
			type: 'geo',
			x: 128 + Math.random() * 500,
			y: 128 + Math.random() * 500,
			props: {
				geo: 'rectangle',
				w: 100,
				h: 100,
				dash: 'draw',
				color: 'blue',
				size: 'm',
			},
		}]);


		// Get the created shape
		// const shape = editor.getShape<TLGeoShape>(id)!;
	  };
	
	useEffect(() => {

		const handleKeyUp = (e: KeyboardEvent) => {
			switch (e.key) {
				case 'Delete':
				case 'Backspace': {
					editor.deleteShapes(editor.selectedShapeIds)
					break
				}
				case 'v': {
					editor.setCurrentTool('select')
					break
				}
				case 'e': {
					editor.setCurrentTool('eraser')
					break
				}
				case 'x':
				case 'p':
				case 'b':
				case 'd': {
					editor.setCurrentTool('draw')
					break
				}
			}
		}

		window.addEventListener('keyup', handleKeyUp)
		return () => {
			window.removeEventListener('keyup', handleKeyUp)
		}
	})
	return (
		<>
		<div className="custom-layout">
			<div className="custom-toolbar">
				<button
					className="custom-button"
					data-isactive={toolId === 'select'}
					onClick={() => {setToolId('select');  editor.setCurrentTool('select')}}
				>
					Select
				</button>
				<button
					className="custom-button"
					onClick={() => createCustomShape()}
				>
					Custom Shape
				</button>
				<button
					className="custom-button"
					data-isactive={toolId === 'note'}
					onClick={() =>{setToolId('note');  editor.setCurrentTool('note')}}
				>
					Note
				</button>
				<button
					className="custom-button"
					data-isactive={toolId === 'arrow'}
					onClick={() => {setToolId('arrow'); editor.setCurrentTool('arrow')}}
				>
					Arrow
				</button>
				
			</div>
		</div>
		<div className="custom-layout">
		<div >
			<button
				className="custom-button"
				data-isactive={editor.currentToolId === 'undo'}
				onClick={() => editor.undo()}
			>
				Undo
			</button>
			<button
				className="custom-button"
				data-isactive={editor.currentToolId === 'redo'}
				onClick={() => editor.redo()}
			>
				Redo
			</button>
			
		</div>
	</div>
		</>
	)
})