// A function to create final entry
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
		if ( sectionName === 'Games' || sectionName === 'Language Files' || sectionName.startsWith( 'Dangerous ' ) )
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
	if ( document.querySelector( '.fileFolderDetect' ).value !== '' )
	{
		// See if DetectFile is multi-line
		let fileFolderDetectParts = document.querySelector( '.fileFolderDetect' ).value.split( '\n' );
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
		fileFolderRemovalsParts.sort();
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
		registryKeyRemovalsParts.sort();
		for( i in registryKeyRemovalsParts )
		{
			finalText += '\nRegKey';
			finalText += parseInt( i ) + 1;
			finalText += '=' + replaceRegFolders( registryKeyRemovalsParts[ i ] );
		}
	}

	// Exclude Keys for Removal
	if ( document.querySelector( '.excludeKeys' ).value !== '' )
	{
		let excludeKeysParts = document.querySelector( '.excludeKeys' ).value.split( '\n' );
		excludeKeysParts.sort();
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

// A function to add an existing entry for editing
function addEntry()
{
	// Get the entry
	let entry = prompt( 'Enter an existing entry to edit.' );

	// Add the entry to final entry text box
	let entryBox = document.querySelector( '.finalEntry' );
	entryBox.innerHTML = entry;

	// Enlarge final entry text box
	entryBox.style.height = 'auto';
	entryBox.style.height = entryBox.scrollHeight + 'px';

	// Split the entry into lines
	let entryParts = entry.split( '\r\n' );

	// Set entry name
	document.querySelector( '.entryName' ).value = entryParts[ 0 ].replace( '[', '' ).replace( ' *]', '' );

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
				document.querySelector( '.osMode' ).value = 'Maximum OS Version';
				document.querySelector( '.osName' ).value = otherPart.replace( '|', '' );
			}
			else if ( /\|$/.test( otherPart ) )
			{
				document.querySelector( '.osMode' ).value = 'Minimum OS Version';
				document.querySelector( '.osName' ).value = otherPart.replace( '|', '' );
			}
			else
			{
				document.querySelector( '.osMode' ).value = 'Strict OS Version';
				document.querySelector( '.osName' ).value = otherPart.split( '|' )[ 0 ];
			}
			document.querySelector( '.osName' ).removeAttribute( 'disabled' );
		}

		// Set Section
		else if ( /^LangSecRef=/.test( entryParts[ i ] ) )
		{
			let matchedPart = entryParts[ i ].match( /^LangSecRef=/ );
			let otherPart = entryParts[ i ].replace( matchedPart, '' );
			document.querySelector( '.section' ).value = otherPart;
		}
		// Section can be defined in two ways
		else if ( /^Section=/.test( entryParts[ i ] ) )
		{
			let matchedPart = entryParts[ i ].match( /^Section=/ );
			let otherPart = entryParts[ i ].replace( matchedPart, '' );
			document.querySelector( '.section' ).value = otherPart;
		}

		// Set Registry Detection Entries
		else if ( /^Detect\d*=/.test( entryParts[ i ] ) )
		{
			let matchedPart = entryParts[ i ].match( /^Detect\d*=/ );
			if ( document.querySelector( '.registryDetect' ).value === '' )
			{
				document.querySelector( '.registryDetect' ).value = entryParts[ i ].replace( matchedPart, '' );
			}
			else
			{
				document.querySelector( '.registryDetect' ).value += '\n' + entryParts[ i ].replace( matchedPart, '' );
			}
			document.querySelector( '.registryDetect' ).style.height = 'auto';
			document.querySelector( '.registryDetect' ).style.height = document.querySelector( '.registryDetect' ).scrollHeight + 'px';
		}

		// Set File Detection Entries
		else if ( /^DetectFile\d*=/.test( entryParts[ i ] ) )
		{
			let matchedPart = entryParts[ i ].match( /^DetectFile\d*=/ );
			if ( document.querySelector( '.fileFolderDetect' ).value === '' )
			{
				document.querySelector( '.fileFolderDetect' ).value = entryParts[ i ].replace( matchedPart, '' );
			}
			else
			{
				document.querySelector( '.fileFolderDetect' ).value += '\n' + entryParts[ i ].replace( matchedPart, '' );
			}
			document.querySelector( '.fileFolderDetect' ).style.height = 'auto';
			document.querySelector( '.fileFolderDetect' ).style.height = document.querySelector( '.fileFolderDetect' ).scrollHeight + 'px';
		}

		// Set warning message
		else if ( /^Warning=/.test( entryParts[ i ] ) )
		{
			let matchedPart = entryParts[ i ].match( /^Warning=/ );
			if ( document.querySelector( '.warning' ).value === '' )
			{
				document.querySelector( '.warning' ).value = entryParts[ i ].replace( matchedPart, '' );
			}
			else
			{
				document.querySelector( '.warning' ).value += '\n' + entryParts[ i ].replace( matchedPart, '' );
			}
		}

		// Set file removal parts
		else if ( /^FileKey\d*=/.test( entryParts[ i ] ) )
		{
			let matchedPart = entryParts[ i ].match( /^FileKey\d*=/ );
			if ( document.querySelector( '.fileFolderRemovals' ).value === '' )
			{
				document.querySelector( '.fileFolderRemovals' ).value = entryParts[ i ].replace( matchedPart, '' );
			}
			else
			{
				document.querySelector( '.fileFolderRemovals' ).value += '\n' + entryParts[ i ].replace( matchedPart, '' );
			}
			document.querySelector( '.fileFolderRemovals' ).style.height = 'auto';
			document.querySelector( '.fileFolderRemovals' ).style.height = document.querySelector( '.fileFolderRemovals' ).scrollHeight + 'px';
		}

		// Set registry removal parts
		else if ( /^RegKey\d*=/.test( entryParts[ i ] ) )
		{
			let matchedPart = entryParts[ i ].match( /^RegKey\d*=/ );
			if ( document.querySelector( '.registryKeyRemovals' ).value === '' )
			{
				document.querySelector( '.registryKeyRemovals' ).value = entryParts[ i ].replace( matchedPart, '' );
			}
			else
			{
				document.querySelector( '.registryKeyRemovals' ).value += '\n' + entryParts[ i ].replace( matchedPart, '' );
			}
			document.querySelector( '.registryKeyRemovals' ).style.height = 'auto';
			document.querySelector( '.registryKeyRemovals' ).style.height = document.querySelector( '.registryKeyRemovals' ).scrollHeight + 'px';
		}

		// Set exclude key parts
		else if ( /^ExcludeKey\d*=/.test( entryParts[ i ] ) )
		{
			let matchedPart = entryParts[ i ].match( /^ExcludeKey\d*=/ );
			if ( document.querySelector( '.excludeKeys' ).value === '' )
			{
				document.querySelector( '.excludeKeys' ).value = entryParts[ i ].replace( matchedPart, '' );
			}
			else
			{
				document.querySelector( '.excludeKeys' ).value += '\n' + entryParts[ i ].replace( matchedPart, '' );
			}
			document.querySelector( '.excludeKeys' ).style.height = 'auto';
			document.querySelector( '.excludeKeys' ).style.height = document.querySelector( '.excludeKeys' ).scrollHeight + 'px';
		}
	}
}
