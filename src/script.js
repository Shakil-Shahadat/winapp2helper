function createEntry()
{
	let finalText = '';

	// Get Entry Name
	if ( document.querySelector( '.entryName' ).value === '' )
	{
		alert( 'Please provide the name of the software.' );
		document.querySelector( '.entryName' ).focus();
		return;
	}
	else
	{
		finalText += '[' + document.querySelector( '.entryName' ).value + ' *]';
	}

	// Get OS Selection
	let osmode = document.querySelector( '.osMode' ).value;
	let osname = document.querySelector( '.osName' ).value;

	if ( osmode === 'Strict OS Version' )
	{
		finalText += '\nDetectOS=' + osname	+ '|' + osname;
	}
	else if ( osmode === 'Minimum OS Version' )
	{
		finalText += '\nDetectOS=' + osname	+ '|';
	}
	else if ( osmode === 'Maximum OS Version' )
	{
		finalText += '\nDetectOS=' + '|' + osname;
	}

	// Get Section Name
	let sectionName = document.querySelector( '.section' ).value;
	if ( sectionName !== 'None' )
	{
		if ( sectionName === 'Language Files' || sectionName === 'License Text Files' )
		{
			finalText += '\nSection=' + document.querySelector( '.section' ).value;
		}
		else
		{
			finalText += '\nLangSecRef=' + document.querySelector( '.section' ).value;
		}
	}

	// Show error if both 'Registry Keys to Detect' &
	// 'Files / Folders to Detect' are empty
	if ( document.querySelector( '.registryDetect' ).value === '' && document.querySelector( '.fileFolderDetect' ).value === '' )
	{
		alert( "Please provide at least one of 'Registry Keys to Detect' "
				+ "and 'Files / Folders to Detect'." );
		document.querySelector( '.registryDetect' ).focus();
		return;
	}

	// Get Registry Entry Detection
	if ( document.querySelector( '.registryDetect' ).value !== '' )
	{
		// See if detect is multi-line
		let regDetectParts = document.querySelector( '.registryDetect' ).value.split( '\n' );
		if ( regDetectParts.length > 1 )
		{
			for( i in regDetectParts )
			{
				finalText += '\nDetect';
				finalText += parseInt( i ) + 1;
				finalText += '=' + regDetectParts[ i ];
			}
		}
		else
		{
			finalText += '\nDetect=' + regDetectParts;
		}
	}

	// File / Folder Detection
	if ( document.querySelector( '.fileFolderDetect' ).value !== '' )
	{
		// See if DetectFile is multi-line
		let fileFolderDetectParts = document.querySelector( '.fileFolderDetect' ).value.split( '\n' );
		if ( fileFolderDetectParts.length > 1 )
		{
			for( i in fileFolderDetectParts )
			{
				finalText += '\nDetectFile';
				finalText += parseInt( i ) + 1;
				finalText += '=' + replaceEnvVar ( fileFolderDetectParts[ i ] );
			}
		}
		else
		{
			finalText += '\nDetectFile=' + replaceEnvVar ( fileFolderDetectParts[ 0 ] );
		}
	}

	// Get Warning Message
	if ( document.querySelector( '.warning' ).value !== '' )
	{
		finalText += '\nWarning=' + document.querySelector( '.warning' ).value;
	}

	// Show error if both 'Files / Folders to Remove' &
	// 'Registry Keys to Remove' are empty
	if ( document.querySelector( '.fileFolderRemovals' ).value === '' && document.querySelector( '.registryKeyRemovals' ).value === '' )
	{
		alert( "Please provide at least one of 'Files / Folders to Remove' "
				+ "and 'Registry Keys to Remove'." );
		document.querySelector( '.fileFolderRemovals' ).focus();
		return;
	}

	// File / Folder for Removal
	if ( document.querySelector( '.fileFolderRemovals' ).value !== '' )
	{
		let fileFolderRemovalsParts = document.querySelector( '.fileFolderRemovals' ).value.split( '\n' );
		for( i in fileFolderRemovalsParts )
		{
			finalText += '\nFileKey';
			finalText += parseInt( i ) + 1;
			finalText += '=' + replaceEnvVar ( fileFolderRemovalsParts[ i ] );
		}
	}

	// Registry Keys for Removal
	if ( document.querySelector( '.registryKeyRemovals' ).value !== '' )
	{
		let registryKeyRemovalsParts = document.querySelector( '.registryKeyRemovals' ).value.split( '\n' );
		for( i in registryKeyRemovalsParts )
		{
			finalText += '\nRegKey';
			finalText += parseInt( i ) + 1;
			finalText += '=' + registryKeyRemovalsParts[ i ];
		}
	}

	// Exclude Keys for Removal
	if ( document.querySelector( '.excludeKeys' ).value !== '' )
	{
		let excludeKeysParts = document.querySelector( '.excludeKeys' ).value.split( '\n' );
		for( i in excludeKeysParts )
		{
			finalText += '\nExcludeKey';
			finalText += parseInt( i ) + 1;
			finalText += '=' + excludeKeysParts[ i ];
		}
	}

	let finalEntry = document.querySelector( '.finalEntry' );

	// Add the final entry to final entry text box
	finalEntry.innerHTML = finalText;

	// Enlarge final entry text box
	finalEntry.style.height = 'auto';
	finalEntry.style.height = finalEntry.scrollHeight + 'px';

	// Visual feedback for 'Create Entry' button
	document.querySelector( '.createButton' ).innerText = '🎉 Created!';
	setTimeout( function(){ document.querySelector( '.createButton' ).innerText = 'Create Entry'; }, 3000 );
}
// createEntry() ends

// Replace paths with environment variables
function replaceEnvVar( txt )
{
	let paths =
	[
		'C:\\Users\\%UserName%\\AppData\\LocalLow',
		'C:\\Users\\%UserName%\\AppData\\Local',
		'C:\\Users\\%UserName%\\AppData\\Roaming',
		'C:\\Users\\%UserName%\\Documents',
		'C:\\Users\\%UserName%\\Music',
		'C:\\Users\\%UserName%\\Pictures',
		'C:\\Users\\%UserName%\\Videos',
		'C:\\Users\\%UserName%',
		'C:\\Program Files\\Common Files',
		'C:\\Program Files (x86)',
		'C:\\Program Files',
		'C:\\ProgramData',
		'C:\\Users\\Public',
		'C:\\Windows',
		'C:'
	];
	let envVar =
	[
		'%LocalLowAppData%',
		'%LocalAppData%',
		'%AppData%',
		'%Documents%',
		'%Music%',
		'%Pictures%',
		'%Video%',
		'%UserProfile%',
		'%CommonProgramFiles%',
		'%ProgramFiles%',
		'%ProgramFiles%',
		'%CommonAppData%',
		'%Public%',
		'%WinDir%',
		'%SystemDrive%'
	];
	for ( i in paths )
	{
		txt = txt.replace( paths[ i ], envVar[ i ] );
	}
	return txt;
}
// replaceEnvVar() ends

// Enable / disable OS selection drop down
function enableOS()
{
	if ( document.querySelector( '.osMode' ).value === 'None' )
	{
		document.querySelector( '.osName' ).setAttribute( 'disabled', 'disabled' );
	}
	else
	{
		document.querySelector( '.osName' ).removeAttribute( 'disabled' );
	}
}

// Copy entry to clipboard
function copy2Clipboard()
{
	navigator.clipboard.writeText( document.querySelector( '.finalEntry' ).value );
	document.querySelector( '.copyButton' ).innerText = '✔️ Copied!';
	setTimeout( function(){ document.querySelector( '.copyButton' ).innerText = 'Copy'; }, 3000 );
}

// Toggle visibility of fields on click on related field name
function toggleMe( targetClass )
{
	let ele = document.querySelector( '.' + targetClass );
	if ( ele.style.display === '' )
	{
		ele.style.display = 'none';
	}
	else
	{
		ele.style.display = '';
	}
}

// Text Area Auto Grow Script
for ( e of document.querySelectorAll( 'textarea' ) )
{
	for ( s of [ 'keyup', 'keydown', 'change', 'cut', 'paste', 'drop' ] )
	{
		e.addEventListener( s, resizeTextarea );
	}
}
function resizeTextarea()
{
	this.style.height = 'auto';
	this.style.height = this.scrollHeight + 'px';
}
