function toggleThemePicker() {
	const themePicker = document.querySelector(".theme-picker");
	if (themePicker.classList.contains("is-open")) {
		themePicker.classList.remove("is-open");
	} else {
		themePicker.classList.add("is-open");
	}
}

function toggleJumboMenu() {
	const jumboMenu = document.querySelector("#jumbo-nav");
	if (jumboMenu.classList.contains("jumbo-nav__open")) {
		jumboMenu.classList.remove("jumbo-nav__open");
	} else {
		jumboMenu.classList.add("jumbo-nav__open");
	}
}

function setTheme(themeName) {
	localStorage.setItem("theme", themeName);
	document.documentElement.className = "theme-" + themeName;

	let current = document.querySelector(".theme-picker li.current");
	if (!current) {
		return;
	}
	current.classList.remove("current");

	current = document.querySelector(
		".theme-picker li." + "theme-" + themeName
	);
	if (!current) {
		return;
	}
	current.classList.add("current");
}


// Set theme before page renders
(function () {
	setTheme(localStorage.getItem("theme") || "ftl");
})();

// When document ready add event listeners
document.addEventListener("DOMContentLoaded", function () {
	const selectTheme = (e) => {
		const btn = e.currentTarget;
		if (!btn.dataset.theme) {
			return;
		}
		setTheme(btn.dataset.theme);
	};

	Array.from(document.getElementsByClassName("theme-selector-btn")).forEach(
		(el) => {
			el.addEventListener("click", selectTheme);
		}
	);

	setTheme(localStorage.getItem("theme") || "dark");
});

// Turbo Links Bluesky Sharing Functions
function toggleTurboComment(index) {
	const commentBox = document.getElementById(`turbo-comment-${index}`);
	const isHidden = commentBox.classList.contains('hidden');

	if (isHidden) {
		commentBox.classList.remove('hidden');
		// Focus the textarea
		const textarea = document.getElementById(`comment-${index}`);
		textarea.focus();
		// Set up character counter
		setupCharacterCounter(index);
	} else {
		commentBox.classList.add('hidden');
	}
}

function cancelTurboComment(index) {
	const commentBox = document.getElementById(`turbo-comment-${index}`);
	const textarea = document.getElementById(`comment-${index}`);

	// Clear the textarea
	textarea.value = '';
	// Hide the comment box
	commentBox.classList.add('hidden');
	// Reset character counter
	updateCharacterCount(index);
}

function setupCharacterCounter(index) {
	const textarea = document.getElementById(`comment-${index}`);
	const charCount = document.getElementById(`char-count-${index}`);

	// Update counter on input
	textarea.addEventListener('input', function() {
		updateCharacterCount(index);
	});

	// Initial count
	updateCharacterCount(index);
}

function updateCharacterCount(index) {
	const textarea = document.getElementById(`comment-${index}`);
	const charCount = document.getElementById(`char-count-${index}`);
	const currentLength = textarea ? textarea.value.length : 0;

	if (charCount) {
		charCount.textContent = currentLength;

		// Color coding for character limit
		if (currentLength > 200) {
			charCount.style.color = '#dc2626'; // red
		} else if (currentLength > 180) {
			charCount.style.color = '#f59e0b'; // amber
		} else {
      charCount.style.color = '#059669'; // dark green
		}
	}
}

function shareWithTurboComment(index, title, sourceUrl, note) {
	const textarea = document.getElementById(`comment-${index}`);
	const userComment = textarea.value.trim();

	// Build the share text
	let shareText = '';

	// Add user comment if provided
	if (userComment) {
		shareText += userComment + '\n\n';
	}

	// Add the quote
	shareText += `"${title}"`;

	// Add note if it exists
	if (note) {
		shareText += `\n\n${note}`;
	}

	// Add attribution
	shareText += `\n\n${sourceUrl}`;

	// Create Bluesky intent URL
	const blueskyUrl = `https://bsky.app/intent/compose?text=${encodeURIComponent(shareText)}`;

	// Open in new tab
	window.open(blueskyUrl, '_blank', 'noopener,noreferrer');

	// Optional: Hide the comment box after sharing
	cancelTurboComment(index);
}

// Instagram-style quote card generator
function generateQuoteCard(index, title, imageUrl, siteName, note) {
	const textarea = document.getElementById(`comment-${index}`);
	const userComment = textarea ? textarea.value.trim() : '';

	// Create canvas
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	// Business card dimensions (3.5" x 2" at 300 DPI)
	canvas.width = 1050;  // 3.5 inches * 300 DPI
	canvas.height = 600;  // 2 inches * 300 DPI

	// Load the cover image
	const img = new Image();
	img.crossOrigin = 'anonymous';

	img.onload = function() {
		// Calculate dimensions to fill canvas while maintaining aspect ratio
		const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
		const scaledWidth = img.width * scale;
		const scaledHeight = img.height * scale;

		// Center the image
		const x = (canvas.width - scaledWidth) / 2;
		const y = (canvas.height - scaledHeight) / 2;

		// Draw background image to fill canvas
		ctx.drawImage(img, x, y, scaledWidth, scaledHeight);

		// Add dark overlay for better text readability
		ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// Text styling
		ctx.fillStyle = 'white';
		ctx.textAlign = 'center';

		// Calculate vertical spacing for business card
		let currentY = 150;

		// User comment (if provided) - place first with smaller font
		if (userComment) {
			ctx.font = 'normal 20px "canela_deck_regular", "Canela Deck", serif';
			const wrappedComment = wrapText(ctx, userComment, canvas.width - 120, 25);
			drawTextBlock(ctx, wrappedComment, canvas.width / 2, currentY);
			currentY += (wrappedComment.lines.length * 25) + 30;
		}

		// Title (main quote) - smaller for business card
		ctx.font = 'bold 28px "canela_deck_trialbold", "Canela Deck", serif';
		ctx.fillStyle = 'white';
		const wrappedTitle = wrapText(ctx, `"${title}"`, canvas.width - 120, 35);
		drawTextBlock(ctx, wrappedTitle, canvas.width / 2, currentY);
		currentY += (wrappedTitle.lines.length * 35) + 20;

		// Note (if exists)
		if (note) {
			ctx.font = 'italic 18px "canela_deck_trialbold_italic", "Canela Deck", serif';
			ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
			const wrappedNote = wrapText(ctx, note, canvas.width - 120, 22);
			drawTextBlock(ctx, wrappedNote, canvas.width / 2, currentY);
			currentY += (wrappedNote.lines.length * 22) + 20;
		}

		// Attribution - place at bottom
		ctx.font = 'normal 16px "canela_deck_trialthin", "Canela Deck", serif';
		ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
		ctx.fillText(`— ${siteName}`, canvas.width / 2, canvas.height - 30);

		// Convert to blob and create download or share
		canvas.toBlob(function(blob) {
			// Create a download link
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `quote-card-${Date.now()}.png`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);

			// Show success message
			showCardGeneratedMessage(index);
		}, 'image/png');
	};

	img.onerror = function() {
		// Fallback: create card without image
		generateTextOnlyCard(index, title, siteName, note, userComment);
	};

	// Handle image loading
	if (imageUrl && imageUrl !== 'null') {
		img.src = imageUrl;
	} else {
		generateTextOnlyCard(index, title, siteName, note, userComment);
	}
}

function wrapText(ctx, text, maxWidth, lineHeight) {
	const words = text.split(' ');
	const lines = [];
	let currentLine = '';

	for (let n = 0; n < words.length; n++) {
		const testLine = currentLine + words[n] + ' ';
		const metrics = ctx.measureText(testLine);
		const testWidth = metrics.width;

		if (testWidth > maxWidth && n > 0) {
			lines.push(currentLine.trim());
			currentLine = words[n] + ' ';
		} else {
			currentLine = testLine;
		}
	}
	lines.push(currentLine.trim());

	return { lines, lineHeight };
}

function drawTextBlock(ctx, textBlock, x, startY) {
	textBlock.lines.forEach((line, index) => {
		ctx.fillText(line, x, startY + (index * textBlock.lineHeight));
	});
}

function generateTextOnlyCard(index, title, siteName, note, userComment) {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	canvas.width = 1600;
	canvas.height = 1200;

	// Gradient background
	const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
	gradient.addColorStop(0, '#667eea');
	gradient.addColorStop(1, '#764ba2');
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// Text styling
	ctx.fillStyle = 'white';
	ctx.textAlign = 'center';

	// Title
	ctx.font = 'bold 48px "canela_deck_trialbold", "Canela Deck", serif';
	const wrappedTitle = wrapText(ctx, `"${title}"`, canvas.width - 200, 60);
	drawTextBlock(ctx, wrappedTitle, canvas.width / 2, 600);

	// User comment
	if (userComment) {
		ctx.font = 'normal 36px "canela_deck_regular", "Canela Deck", serif';
		const wrappedComment = wrapText(ctx, userComment, canvas.width - 200, 45);
		drawTextBlock(ctx, wrappedComment, canvas.width / 2, 450);
	}

	// Note
	if (note) {
		ctx.font = 'italic 30px "canela_deck_trialbold_italic", "Canela Deck", serif';
		ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
		const wrappedNote = wrapText(ctx, note, canvas.width - 200, 38);
		drawTextBlock(ctx, wrappedNote, canvas.width / 2, 800);
	}

	// Attribution
	ctx.font = 'normal 28px "canela_deck_trialthin", "Canela Deck", serif';
	ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
	ctx.fillText(`— ${siteName}`, canvas.width / 2, 950);

	// Download
	canvas.toBlob(function(blob) {
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `quote-card-${Date.now()}.png`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);

		showCardGeneratedMessage(index);
	}, 'image/png');
}

function showCardGeneratedMessage(index) {
	// Create temporary success message
	const button = document.querySelector(`button[onclick*="generateQuoteCard(${index}"]`);
	if (button) {
		const originalText = button.innerHTML;
		button.innerHTML = '<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg><span>Downloaded!</span>';
		button.classList.add('bg-green-100');

		setTimeout(() => {
			button.innerHTML = originalText;
			button.classList.remove('bg-green-100');
		}, 2000);
	}
}

