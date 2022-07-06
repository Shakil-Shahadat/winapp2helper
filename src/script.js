// Helper function
function qs( cls )
{
	return document.querySelector( cls );
}

// A function to add an existing entry for editing
function addEntry()
{
	// Get the entry
	let entry = prompt( 'Enter an existing entry to edit.' );

	// Exit function if prompt is cancelled
	if ( entry === null ) return;

	// Split the entry into lines
	let entryParts = entry.split( '\r\n' );

	// Set entry name
	qs( '.entryName' ).value = entryParts[ 0 ].replace( '[', '' ).replace( ' *]', '' );

	// Loop over lines to add them in respective section
	for ( let i = 1; i < entryParts.length; i++ )
	{
		// Set OS Selection Mode & OS
		if ( /^DetectOS=/.test( entryParts[ i ] ) )
		{
			let matchedPart = entryParts[ i ].match( /^DetectOS=/ );
			let otherPart = entryParts[ i ].replace( matchedPart, '' );
			if ( /^\|/.test( otherPart ) )
			{
				qs( '.osMode' ).value = 'Maximum OS Version';
				qs( '.osName' ).value = otherPart.replace( '|', '' );
			}
			else if ( /\|$/.test( otherPart ) )
			{
				qs( '.osMode' ).value = 'Minimum OS Version';
				qs( '.osName' ).value = otherPart.replace( '|', '' );
			}
			else
			{
				qs( '.osMode' ).value = 'Strict OS Version';
				qs( '.osName' ).value = otherPart.split( '|' )[ 0 ];
			}
			qs( '.osName' ).parentNode.classList.remove( 'd-none' );
		}

		// Set Section: Defined by 'LangSecRef'
		else if ( /^LangSecRef=/.test( entryParts[ i ] ) )
		{
			let matchedPart = entryParts[ i ].match( /^LangSecRef=/ );
			let otherPart = entryParts[ i ].replace( matchedPart, '' );
			qs( '.section' ).value = otherPart;
		}
		// Set Section: Defined by 'Section'
		else if ( /^Section=/.test( entryParts[ i ] ) )
		{
			let matchedPart = entryParts[ i ].match( /^Section=/ );
			let otherPart = entryParts[ i ].replace( matchedPart, '' );
			qs( '.section' ).value = otherPart;
		}

		// Set Registry Keys Detection Entries
		else if ( /^Detect\d*=/.test( entryParts[ i ] ) )
		{
			let matchedPart = entryParts[ i ].match( /^Detect\d*=/ );
			if ( qs( '.registryDetect' ).value === '' )
			{
				qs( '.registryDetect' ).value = entryParts[ i ].replace( matchedPart, '' );
			}
			else
			{
				qs( '.registryDetect' ).value += '\n' + entryParts[ i ].replace( matchedPart, '' );
			}
			resizeTextArea2( 'registryDetect' );
		}

		// Set Files / Folders Detection Entries
		else if ( /^DetectFile\d*=/.test( entryParts[ i ] ) )
		{
			let matchedPart = entryParts[ i ].match( /^DetectFile\d*=/ );
			if ( qs( '.fileFolderDetect' ).value === '' )
			{
				qs( '.fileFolderDetect' ).value = entryParts[ i ].replace( matchedPart, '' );
			}
			else
			{
				qs( '.fileFolderDetect' ).value += '\n' + entryParts[ i ].replace( matchedPart, '' );
			}
			resizeTextArea2( 'fileFolderDetect' );
		}

		// Set Warning Message
		else if ( /^Warning=/.test( entryParts[ i ] ) )
		{
			let matchedPart = entryParts[ i ].match( /^Warning=/ );
			if ( qs( '.warning' ).value === '' )
			{
				qs( '.warning' ).value = entryParts[ i ].replace( matchedPart, '' );
			}
			else
			{
				qs( '.warning' ).value += '\n' + entryParts[ i ].replace( matchedPart, '' );
			}
		}

		// Set Files / Folders Removal Parts
		else if ( /^FileKey\d*=/.test( entryParts[ i ] ) )
		{
			let matchedPart = entryParts[ i ].match( /^FileKey\d*=/ );
			if ( qs( '.fileFolderRemovals' ).value === '' )
			{
				qs( '.fileFolderRemovals' ).value = entryParts[ i ].replace( matchedPart, '' );
			}
			else
			{
				qs( '.fileFolderRemovals' ).value += '\n' + entryParts[ i ].replace( matchedPart, '' );
			}
			resizeTextArea2( 'fileFolderRemovals' );
		}

		// Set Registry Keys Removal Parts
		else if ( /^RegKey\d*=/.test( entryParts[ i ] ) )
		{
			let matchedPart = entryParts[ i ].match( /^RegKey\d*=/ );
			if ( qs( '.registryKeyRemovals' ).value === '' )
			{
				qs( '.registryKeyRemovals' ).value = entryParts[ i ].replace( matchedPart, '' );
			}
			else
			{
				qs( '.registryKeyRemovals' ).value += '\n' + entryParts[ i ].replace( matchedPart, '' );
			}
			resizeTextArea2( 'registryKeyRemovals' );
		}

		// Set Exclude Keys
		else if ( /^ExcludeKey\d*=/.test( entryParts[ i ] ) )
		{
			let matchedPart = entryParts[ i ].match( /^ExcludeKey\d*=/ );
			if ( qs( '.excludeKeys' ).value === '' )
			{
				qs( '.excludeKeys' ).value = entryParts[ i ].replace( matchedPart, '' );
			}
			else
			{
				qs( '.excludeKeys' ).value += '\n' + entryParts[ i ].replace( matchedPart, '' );
			}
			resizeTextArea2( 'excludeKeys' );
		}
	} // for loop ends

	// Create final entry
	createEntry();
}
// addEntry() ends

// Enable / disable OS selection drop down
function enableOS()
{
	if ( qs( '.osMode' ).value === 'None' )
	{
		qs( '.osName' ).parentNode.classList.add( 'd-none' );
	}
	else
	{
		qs( '.osName' ).parentNode.classList.remove( 'd-none' );
	}
}

// Text Area Auto Grow Script
function resizeTextArea()
{
	this.style.height = 'auto';
	let newHeight = this.scrollHeight + 2;
	this.style.height = newHeight + 'px';
}
for ( e of document.querySelectorAll( 'textarea' ) )
{
	for ( s of [ 'keyup', 'keydown', 'change', 'cut', 'paste', 'drop' ] )
	{
		e.addEventListener( s, resizeTextArea );
	}
}
function resizeTextArea2( cls )
{
	qs( '.' + cls ).style.height = 'auto';
	let newHeight = qs( '.' + cls ).scrollHeight + 2;
	qs( '.' + cls ).style.height = newHeight + 'px';
}

// A function to create final entry
function createEntry()
{
	let finalText = '';

	// Get Entry Name
	if ( qs( '.entryName' ).value === '' )
	{
		alert( 'Please provide the name of the software.' );
		qs( '.entryName' ).focus();
		return;
	}
	else
	{
		finalText += '[' + qs( '.entryName' ).value;
		if ( qs( '.entryType' ).value !== 'General' )
		{
			finalText += ' ' + qs( '.entryType' ).value;
		}
		finalText += ' *]';
	}

	// Get OS Selection
	let osmode = qs( '.osMode' ).value;
	let osname = qs( '.osName' ).value;

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
	let sectionName = qs( '.section' ).value;
	if ( sectionName !== 'None' )
	{
		if ( sectionName === 'Games' || sectionName === 'Language Files' || sectionName.startsWith( 'Dangerous ' ) )
		{
			finalText += '\nSection=' + qs( '.section' ).value;
		}
		else
		{
			finalText += '\nLangSecRef=' + qs( '.section' ).value;
		}
	}

	// Show error if both 'Registry Keys to Detect' &
	// 'Files / Folders to Detect' are empty
	if ( qs( '.fileFolderDetect' ).value === '' && qs( '.registryDetect' ).value === '' )
	{
		alert( "Please provide at least one of 'Files / Folders to Detect' "
				+ "and 'Registry Keys to Detect'." );
		qs( '.fileFolderDetect' ).focus();
		return;
	}

	// Get Registry Entry Detection
	if ( qs( '.registryDetect' ).value !== '' )
	{
		// See if detect is multi-line
		let regDetectParts = qs( '.registryDetect' ).value.split( '\n' );
		if ( regDetectParts.length > 1 )
		{
			regDetectParts.sort();
			for( i in regDetectParts )
			{
				finalText += '\nDetect';
				finalText += parseInt( i ) + 1;
				finalText += '=' + replaceRegFolders( regDetectParts[ i ] );
			}
		}
		else
		{
			finalText += '\nDetect=' + replaceRegFolders( regDetectParts[ 0 ] );
		}
	}

	// File / Folder Detection
	if ( qs( '.fileFolderDetect' ).value !== '' )
	{
		// See if DetectFile is multi-line
		let fileFolderDetectParts = qs( '.fileFolderDetect' ).value.split( '\n' );
		if ( fileFolderDetectParts.length > 1 )
		{
			fileFolderDetectParts.sort();
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
	if ( qs( '.warning' ).value !== '' )
	{
		finalText += '\nWarning=' + qs( '.warning' ).value;
	}

	// Show error if both 'Files / Folders to Remove' &
	// 'Registry Keys to Remove' are empty
	if ( qs( '.fileFolderRemovals' ).value === '' && qs( '.registryKeyRemovals' ).value === '' )
	{
		alert( "Please provide at least one of 'Files / Folders to Remove' "
				+ "and 'Registry Keys to Remove'." );
		qs( '.fileFolderRemovals' ).focus();
		return;
	}

	// File / Folder for Removal
	if ( qs( '.fileFolderRemovals' ).value !== '' )
	{
		let fileFolderRemovalsParts = qs( '.fileFolderRemovals' ).value.split( '\n' );
		fileFolderRemovalsParts.sort();
		for( i in fileFolderRemovalsParts )
		{
			finalText += '\nFileKey';
			finalText += parseInt( i ) + 1;
			finalText += '=' + replaceEnvVar ( fileFolderRemovalsParts[ i ] );
		}
	}

	// Registry Keys for Removal
	if ( qs( '.registryKeyRemovals' ).value !== '' )
	{
		let registryKeyRemovalsParts = qs( '.registryKeyRemovals' ).value.split( '\n' );
		registryKeyRemovalsParts.sort();
		for( i in registryKeyRemovalsParts )
		{
			finalText += '\nRegKey';
			finalText += parseInt( i ) + 1;
			finalText += '=' + replaceRegFolders( registryKeyRemovalsParts[ i ] );
		}
	}

	// Exclude Keys for Removal
	if ( qs( '.excludeKeys' ).value !== '' )
	{
		let excludeKeysParts = qs( '.excludeKeys' ).value.split( '\n' );
		excludeKeysParts.sort();
		for( i in excludeKeysParts )
		{
			finalText += '\nExcludeKey';
			finalText += parseInt( i ) + 1;
			if ( /^REG\|/.test( excludeKeysParts[ i ] ) )
			{
				finalText += '=' + replaceRegFolders ( excludeKeysParts[ i ] );
			}
			else if ( /^FILE\|/.test( excludeKeysParts[ i ] ) )
			{
				// Check if it contains '\' at the end of the path
				let pos = excludeKeysParts[ i ].lastIndexOf( '|' );
				if ( excludeKeysParts[ i ].charAt( pos - 1 ) !== '\\' )
				{
					alert( "Every 'Exclude Keys' requires '\\' at the end of the path." );
					qs( '.excludeKeys' ).focus();
					return;
				}
				finalText += '=' + replaceEnvVar ( excludeKeysParts[ i ] );
			}
			else if ( /^PATH\|/.test( excludeKeysParts[ i ] ) )
			{
				// Check if it contains '\' at the end of the path
				let pos = excludeKeysParts[ i ].lastIndexOf( '|' );
				if ( excludeKeysParts[ i ].charAt( pos - 1 ) !== '\\' )
				{
					alert( "Every 'Exclude Keys' requires '\\' at the end of the path." );
					qs( '.excludeKeys' ).focus();
					return;
				}
				finalText += '=' + replaceEnvVar ( excludeKeysParts[ i ] );
			}
			else
			{
				alert( "Every 'Exclude Keys' must start with 'FILE|' or 'PATH|' or 'REG|'." );
				qs( '.excludeKeys' ).focus();
				return;
			}
		}
	}

	// Add the final entry to final entry text box
	qs( '.finalEntry' ).innerHTML = finalText;

	// Enlarge final entry text box
	resizeTextArea2( 'finalEntry' );

	// Visual feedback for 'Create Entry' button
	qs( '.createButton' ).innerText = '🎉 Created!';
	setTimeout( function(){ qs( '.createButton' ).innerText = 'Create Entry'; }, 3000 );
}
// createEntry() ends

// Replace registry folders with shortcuts
function replaceRegFolders( txt )
{
	let folders =
	[
		'HKEY_CLASSES_ROOT',
		'HKEY_CURRENT_USER',
		'HKEY_LOCAL_MACHINE',
		'HKEY_USERS',
		'HKEY_CURRENT_CONFIG'
	];
	let shorts =
	[
		'HKCR',
		'HKCU',
		'HKLM',
		'HKU',
		'HKCC'
	];
	for ( i in folders )
	{
		txt = txt.replace( folders[ i ], shorts[ i ] );
	}
	return txt;
}
// replaceRegFolders() ends

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

// Copy entry to clipboard
function copy2Clipboard()
{
	navigator.clipboard.writeText( qs( '.finalEntry' ).value );
	qs( '.copyButton' ).innerText = '✔️ Copied!';
	setTimeout( function(){ qs( '.copyButton' ).innerText = 'Copy'; }, 3000 );
}
