import { addListToDropdown, createDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Model from '@ckeditor/ckeditor5-ui/src/model';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';
import TokensIcon from '../plugin/tokens.svg';

class Tokens extends Plugin {
	init() {
		const editor = this.editor;

		editor.ui.componentFactory.add( 'tokens', locale => {
			// Toolbar button
			const view = createDropdown( locale );
			const items = new Collection();

			view.buttonView.set( {
				icon: TokensIcon,
				label: 'Insert token',
				tooltip: true
			} );

			const tokens = editor.config.get( 'tokens' ) || [];

			tokens.forEach( token => {
				items.add( {
					type: 'button',
					model: new Model( {
						withText: true,
						label: token,
						value: token
					} )
				} );
			} );

			addListToDropdown( view, items );

			// Callback executed once the toolbar button is clicked
			view.on( 'execute', event => {
				const tokenName = `#${ event.source.value }#`;

				editor.model.change( writer => {
					const spanElement = writer.createText( tokenName );
					writer.setAttribute( 'bold', true, spanElement );
					writer.setAttribute( 'highlight', 'yellowMarker', spanElement );
					editor.model.insertContent( spanElement, editor.model.document.selection );
				} );
			} );

			return view;
		} );
	}
}

export default Tokens;
