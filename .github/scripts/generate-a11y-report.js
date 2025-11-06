#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// WCAG 2.1 rule mappings with severity and descriptions
const WCAG_RULES = {
  'jsx-a11y/alt-text': {
    wcag: '1.1.1',
    level: 'A',
    severity: 'critical',
    title: 'Images must have alt text',
    description: 'Images need alternative text for screen readers',
    fix: 'Add alt="description" to <img> tags'
  },
  'jsx-a11y/anchor-has-content': {
    wcag: '2.4.4',
    level: 'A',
    severity: 'critical',
    title: 'Links must have content',
    description: 'Links need visible text or accessible names',
    fix: 'Add text content or aria-label to <a> tags'
  },
  'jsx-a11y/control-has-associated-label': {
    wcag: '4.1.2',
    level: 'A',
    severity: 'critical',
    title: 'Form controls need labels',
    description: 'Interactive elements need accessible names',
    fix: 'Add aria-label or associate with <label>'
  },
  'jsx-a11y/heading-has-content': {
    wcag: '2.4.6',
    level: 'AA',
    severity: 'major',
    title: 'Headings must have content',
    description: 'Heading elements need descriptive text',
    fix: 'Add text content to heading elements'
  },
  'jsx-a11y/label-has-associated-control': {
    wcag: '1.3.1',
    level: 'A',
    severity: 'major',
    title: 'Labels must be associated with controls',
    description: 'Labels need to be connected to form inputs',
    fix: 'Use htmlFor attribute or wrap input in label'
  },
  'jsx-a11y/click-events-have-key-events': {
    wcag: '2.1.1',
    level: 'A',
    severity: 'major',
    title: 'Clickable elements need keyboard support',
    description: 'Elements with click handlers need keyboard events',
    fix: 'Add onKeyDown/onKeyUp handlers'
  },
  'jsx-a11y/interactive-supports-focus': {
    wcag: '2.1.1',
    level: 'A',
    severity: 'major',
    title: 'Interactive elements must be focusable',
    description: 'Interactive elements need to receive keyboard focus',
    fix: 'Add tabIndex="0" or use semantic HTML'
  },
  'jsx-a11y/no-noninteractive-element-interactions': {
    wcag: '4.1.2',
    level: 'A',
    severity: 'minor',
    title: 'Non-interactive elements with interactions',
    description: 'Semantic elements should match their behavior',
    fix: 'Use button/link elements for interactive content'
  },
  'jsx-a11y/html-has-lang': {
    wcag: '3.1.1',
    level: 'A',
    severity: 'major',
    title: 'Page must have language declared',
    description: 'HTML element needs lang attribute',
    fix: 'Add lang="en" to <html> element'
  },
  'jsx-a11y/media-has-caption': {
    wcag: '1.2.2',
    level: 'A',
    severity: 'major',
    title: 'Media needs captions',
    description: 'Video/audio content needs captions or transcripts',
    fix: 'Add captions, transcripts, or muted attribute'
  }
};

function analyzeESLintResults() {
  try {
    // Read ESLint results
    const eslintReport = JSON.parse(fs.readFileSync('eslint-report.json', 'utf8'));
    
    // Initialize counters
    let totalIssues = 0;
    let critical = 0;
    let major = 0;
    let minor = 0;
    let filesAffected = 0;
    const issuesByRule = {};
    const issuesByFile = {};
    
    // Process each file's results
    eslintReport.forEach(fileResult => {
      if (fileResult.messages.length > 0) {
        filesAffected++;
        issuesByFile[fileResult.filePath] = [];
        
        fileResult.messages.forEach(message => {
          // Only process accessibility-related rules
          if (message.ruleId && message.ruleId.startsWith('jsx-a11y/')) {
            totalIssues++;
            
            const rule = WCAG_RULES[message.ruleId];
            const severity = rule ? rule.severity : 'minor';
            
            // Count by severity
            if (severity === 'critical') critical++;
            else if (severity === 'major') major++;
            else minor++;
            
            // Group by rule
            if (!issuesByRule[message.ruleId]) {
              issuesByRule[message.ruleId] = [];
            }
            issuesByRule[message.ruleId].push({
              file: fileResult.filePath,
              line: message.line,
              column: message.column,
              message: message.message
            });
            
            // Group by file
            issuesByFile[fileResult.filePath].push({
              rule: message.ruleId,
              line: message.line,
              message: message.message,
              severity
            });
          }
        });
        
        // Remove files with no accessibility issues
        if (issuesByFile[fileResult.filePath].length === 0) {
          delete issuesByFile[fileResult.filePath];
          filesAffected--;
        }
      }
    });
    
    // Calculate scores
    const overallScore = calculateOverallScore(critical, major, minor);
    const gradeLabel = getGradeLabel(overallScore);
    const wcagCompliance = calculateWCAGCompliance(issuesByRule);
    
    // Generate report sections
    const issueBreakdown = generateIssueBreakdown(issuesByRule);
    const recommendations = generateRecommendations(issuesByRule);
    const detailedIssues = generateDetailedIssues(issuesByFile);
    
    const report = {
      overallScore,
      gradeLabel,
      totalIssues,
      critical,
      major,
      minor,
      filesAffected,
      wcagA: wcagCompliance.levelA,
      wcagAA: wcagCompliance.levelAA,
      issueBreakdown,
      recommendations,
      detailedIssues,
      timestamp: new Date().toISOString()
    };
    
    // Write report to file
    fs.writeFileSync('accessibility-report.json', JSON.stringify(report, null, 2));
    
    console.log(`✅ Accessibility report generated`);
    console.log(`📊 Overall Score: ${overallScore}/100 (${gradeLabel})`);
    console.log(`🔍 Issues Found: ${totalIssues} (Critical: ${critical}, Major: ${major}, Minor: ${minor})`);
    
    return report;
    
  } catch (error) {
    console.error('❌ Error generating accessibility report:', error);
    
    // Create minimal report on error
    const errorReport = {
      overallScore: 0,
      gradeLabel: 'Error',
      totalIssues: 0,
      critical: 0,
      major: 0,
      minor: 0,
      filesAffected: 0,
      wcagA: 0,
      wcagAA: 0,
      issueBreakdown: '❌ Error analyzing results. Please check the ESLint output.',
      recommendations: '🔧 Fix ESLint configuration and re-run the analysis.',
      detailedIssues: 'No detailed analysis available due to error.',
      error: error.message,
      timestamp: new Date().toISOString()
    };
    
    fs.writeFileSync('accessibility-report.json', JSON.stringify(errorReport, null, 2));
    return errorReport;
  }
}

function calculateOverallScore(critical, major, minor) {
  // Weighted scoring system
  const criticalWeight = 20;  // Each critical issue removes 20 points
  const majorWeight = 10;     // Each major issue removes 10 points
  const minorWeight = 5;      // Each minor issue removes 5 points
  
  const deductions = (critical * criticalWeight) + (major * majorWeight) + (minor * minorWeight);
  const score = Math.max(0, 100 - deductions);
  
  return Math.round(score);
}

function getGradeLabel(score) {
  if (score >= 95) return '🏆 Excellent';
  if (score >= 85) return '🟢 Good';
  if (score >= 70) return '🟡 Needs Improvement';
  if (score >= 50) return '🟠 Poor';
  return '🔴 Critical Issues';
}

function calculateWCAGCompliance(issuesByRule) {
  const levelARules = Object.keys(WCAG_RULES).filter(rule => WCAG_RULES[rule].level === 'A');
  const levelAARules = Object.keys(WCAG_RULES).filter(rule => WCAG_RULES[rule].level === 'AA');
  
  const levelAViolations = levelARules.filter(rule => issuesByRule[rule]);
  const levelAAViolations = levelAARules.filter(rule => issuesByRule[rule]);
  
  const levelACompliance = Math.round(((levelARules.length - levelAViolations.length) / levelARules.length) * 100);
  const levelAACompliance = Math.round(((levelAARules.length - levelAAViolations.length) / levelAARules.length) * 100);
  
  return {
    levelA: Math.max(0, levelACompliance),
    levelAA: Math.max(0, levelAACompliance)
  };
}

function generateIssueBreakdown(issuesByRule) {
  if (Object.keys(issuesByRule).length === 0) {
    return '✅ No accessibility issues found!';
  }
  
  let breakdown = '';
  
  // Sort rules by severity and count
  const sortedRules = Object.entries(issuesByRule)
    .sort(([a, instancesA], [b, instancesB]) => {
      const severityOrder = { critical: 0, major: 1, minor: 2 };
      const severityA = WCAG_RULES[a] ? severityOrder[WCAG_RULES[a].severity] : 2;
      const severityB = WCAG_RULES[b] ? severityOrder[WCAG_RULES[b].severity] : 2;
      
      if (severityA !== severityB) return severityA - severityB;
      return instancesB.length - instancesA.length;
    });
  
  sortedRules.forEach(([ruleId, instances]) => {
    const rule = WCAG_RULES[ruleId];
    const count = instances.length;
    const severity = rule ? rule.severity : 'minor';
    const severityIcon = severity === 'critical' ? '🔴' : severity === 'major' ? '🟠' : '🟡';
    
    breakdown += `\n${severityIcon} **${rule ? rule.title : ruleId}** (${count} ${count === 1 ? 'issue' : 'issues'})\n`;
    breakdown += `   └ WCAG ${rule ? rule.wcag : 'Unknown'} • ${rule ? rule.description : 'See ESLint documentation'}\n`;
  });
  
  return breakdown;
}

function generateRecommendations(issuesByRule) {
  if (Object.keys(issuesByRule).length === 0) {
    return '🎉 Great job! Your code follows accessibility best practices.';
  }
  
  let recommendations = '';
  let count = 0;
  
  // Show top 5 most critical recommendations
  const sortedRules = Object.entries(issuesByRule)
    .sort(([a, instancesA], [b, instancesB]) => {
      const severityOrder = { critical: 0, major: 1, minor: 2 };
      const severityA = WCAG_RULES[a] ? severityOrder[WCAG_RULES[a].severity] : 2;
      const severityB = WCAG_RULES[b] ? severityOrder[WCAG_RULES[b].severity] : 2;
      
      if (severityA !== severityB) return severityA - severityB;
      return instancesB.length - instancesA.length;
    })
    .slice(0, 5);
  
  sortedRules.forEach(([ruleId, instances]) => {
    const rule = WCAG_RULES[ruleId];
    count++;
    
    recommendations += `\n${count}. **${rule ? rule.fix : 'Fix ' + ruleId}**\n`;
    recommendations += `   └ Affects ${instances.length} ${instances.length === 1 ? 'location' : 'locations'}\n`;
  });
  
  return recommendations;
}

function generateDetailedIssues(issuesByFile) {
  if (Object.keys(issuesByFile).length === 0) {
    return '✅ No issues to display!';
  }
  
  let details = '';
  
  Object.entries(issuesByFile).forEach(([filePath, issues]) => {
    const fileName = path.basename(filePath);
    details += `\n### 📁 ${fileName}\n`;
    
    issues.forEach(issue => {
      const rule = WCAG_RULES[issue.rule];
      const severityIcon = issue.severity === 'critical' ? '🔴' : 
                          issue.severity === 'major' ? '🟠' : '🟡';
      
      details += `- **Line ${issue.line}**: ${severityIcon} ${issue.message}\n`;
      if (rule) {
        details += `  └ *${rule.fix}*\n`;
      }
    });
  });
  
  return details;
}

// Run the analysis
if (require.main === module) {
  analyzeESLintResults();
}

module.exports = { analyzeESLintResults };