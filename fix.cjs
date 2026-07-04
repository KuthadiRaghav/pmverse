const fs = require('fs');

let f1 = fs.readFileSync('src/data/caseTheSunset.js', 'utf8');
f1 = f1.replace(/\\`platform_usage\\`/g, '\\`platform_usage\\`');
f1 = f1.replace(/\\`engineering_costs\\`/g, '\\`engineering_costs\\`');
f1 = f1.replace(/- `platform_usage`/g, '- \\`platform_usage\\`');
f1 = f1.replace(/- `engineering_costs`/g, '- \\`engineering_costs\\`');
fs.writeFileSync('src/data/caseTheSunset.js', f1);

let f2 = fs.readFileSync('src/data/casePricingPivot.js', 'utf8');
f2 = f2.replace(/Table: `account_usage`/g, 'Table: \\`account_usage\\`');
fs.writeFileSync('src/data/casePricingPivot.js', f2);
