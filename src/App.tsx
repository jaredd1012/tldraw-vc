import { Canvas, Tldraw,} from '@tldraw/tldraw'

import { CustomUi } from './CusomUI';

function App() {
	const persistenceId = "tldraw-example";
	return (
		<div className="tldraw__editor">
			 <Tldraw autoFocus hideUi>
        <Canvas />
        <CustomUi />
      </Tldraw>
		</div>
	)
}

export default App
