param(
  [string]$ProjectPath = "."
)

$SkillName = "video-creation-psychology-analysis"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$SourceDir = Resolve-Path (Join-Path $ScriptDir "..")
$TargetDir = Join-Path $ProjectPath ".skills\$SkillName"

New-Item -ItemType Directory -Force -Path (Join-Path $ProjectPath ".skills") | Out-Null
New-Item -ItemType Directory -Force -Path (Join-Path $ProjectPath ".claude\commands") | Out-Null

if (Test-Path $TargetDir) { Remove-Item -Recurse -Force $TargetDir }
Copy-Item -Recurse -Force $SourceDir $TargetDir

$AgentsPath = Join-Path $ProjectPath "AGENTS.md"
$ClaudePath = Join-Path $ProjectPath "CLAUDE.md"

if (Test-Path $AgentsPath) {
  Add-Content -Path $AgentsPath -Value "`n`n---`n"
  Get-Content (Join-Path $TargetDir "AGENTS.md") | Add-Content -Path $AgentsPath
} else {
  Copy-Item (Join-Path $TargetDir "AGENTS.md") $AgentsPath
}

if (Test-Path $ClaudePath) {
  Add-Content -Path $ClaudePath -Value "`n`n---`n"
  Get-Content (Join-Path $TargetDir "CLAUDE.md") | Add-Content -Path $ClaudePath
} else {
  Copy-Item (Join-Path $TargetDir "CLAUDE.md") $ClaudePath
}

Copy-Item (Join-Path $TargetDir ".claude\commands\video-psychology.md") (Join-Path $ProjectPath ".claude\commands\video-psychology.md") -Force

Write-Host "Installed $SkillName to $ProjectPath"
Write-Host "Codex entry: AGENTS.md"
Write-Host "Claude Code entry: CLAUDE.md and .claude/commands/video-psychology.md"
