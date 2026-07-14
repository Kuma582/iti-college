const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'frontend', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

let updatedCount = 0;

files.forEach(file => {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Check if it already has login.html in the nav
    // We are looking for the end of the nav block where Contact is.
    
    if (content.includes('href="login.html"') && content.indexOf('href="login.html"') < content.indexOf('</nav>')) {
        console.log(`${file} already has login in nav.`);
        return;
    }

    // A robust regex to find the contact link and insert the login link right after it, before </nav>
    const regex = /(<a\s+href="contact\.html"[^>]*>Contact<\/a>\s*)(<\/nav>)/i;
    
    if (regex.test(content)) {
        content = content.replace(regex, '$1<a href="login.html" class="lg:hidden hover:text-brandBlue transition-colors pb-1 border-b-2 border-transparent hover:border-brandGold">Login</a>\n            $2');
        fs.writeFileSync(filePath, content, 'utf-8');
        updatedCount++;
        console.log(`Updated ${file}`);
    } else {
        console.log(`Could not find the insertion point in ${file}`);
    }
});

console.log(`Successfully updated ${updatedCount} files.`);
