# PowerShell script to update file path comments in TypeScript files

$workspaceRoot = "C:\Workspaces\dreams"
$rootTsConfigPath = Join-Path $workspaceRoot "tsconfig.json"

function Get-DirectoriesFromRootTsConfig {
    param(
        [string]$TsConfigPath
    )

    if (-not (Test-Path -Path $TsConfigPath -PathType Leaf)) {
        throw "Root tsconfig not found: $TsConfigPath"
    }

    $rawContent = Get-Content -Path $TsConfigPath -Raw
    if ([string]::IsNullOrWhiteSpace($rawContent)) {
        throw "Root tsconfig is empty: $TsConfigPath"
    }

    # Support JSONC-style comments
    $jsonContent = $rawContent -replace '(?ms)/\*.*?\*/', ''
    $jsonContent = $jsonContent -replace '(?m)^\s*//.*$', ''
    $jsonContent = $jsonContent -replace ',(\s*[}\]])', '$1'

    $tsConfig = $jsonContent | ConvertFrom-Json
    if ($null -eq $tsConfig.references) {
        throw "No references found in root tsconfig: $TsConfigPath"
    }

    $rootDir = Split-Path -Path $TsConfigPath -Parent
    $directories = New-Object 'System.Collections.Generic.List[string]'

    foreach ($reference in $tsConfig.references) {
        $referencePath = [string]$reference.path
        if ([string]::IsNullOrWhiteSpace($referencePath)) {
            continue
        }

        $dirPath = Join-Path -Path $rootDir -ChildPath $referencePath
        if (Test-Path -Path $dirPath -PathType Container) {
            $directories.Add((Resolve-Path -Path $dirPath).Path)
        } else {
            Write-Host "Skipping missing referenced directory: $dirPath"
        }
    }

    return $directories
}

function Update-FileHeader {
    param(
        [string]$FilePath,
        [string]$WorkspaceRoot
    )

    # Read file text while preserving original encoding
    $reader = New-Object System.IO.StreamReader($FilePath, $true)
    try {
        $content = $reader.ReadToEnd()
        $encoding = $reader.CurrentEncoding
    } finally {
        $reader.Dispose()
    }

    if ($null -eq $content -or $content.Length -eq 0) {
        return $false
    }

    # Calculate the relative path from workspace root
    $relativePath = Resolve-Path -Path $FilePath -Relative
    $relativePath = $relativePath -replace '^\.\\', ''
    $relativePath = $relativePath -replace '\\', '/'

    $expectedHeader = ("// $relativePath").TrimEnd()

    # Only modify the first line; preserve the body exactly as-is
    $lineBreakMatch = [regex]::Match($content, "`r`n|`n|`r")
    if ($lineBreakMatch.Success) {
        $lineSeparator = $lineBreakMatch.Value
        $firstLine = $content.Substring(0, $lineBreakMatch.Index)
        $body = $content.Substring($lineBreakMatch.Index + $lineBreakMatch.Length)
    } else {
        $lineSeparator = [Environment]::NewLine
        $firstLine = $content
        $body = ""
    }

    if ($firstLine -match "^// ") {
        $hasBlankLineAfterHeader = $body.StartsWith($lineSeparator)
        if (($firstLine -eq $expectedHeader) -and $hasBlankLineAfterHeader) {
            return $false
        }

        if ($hasBlankLineAfterHeader) {
            $bodyWithSpacing = $body
        } else {
            $bodyWithSpacing = $lineSeparator + $body
        }

        $newContent = $expectedHeader + $lineSeparator + $bodyWithSpacing
        $writer = New-Object System.IO.StreamWriter($FilePath, $false, $encoding)
        try {
            $writer.Write($newContent)
        } finally {
            $writer.Dispose()
        }
        Write-Host "Updated: $FilePath"
        return $true
    }

    if ($lineBreakMatch.Success) {
        $newContent = $expectedHeader + $lineSeparator + $lineSeparator + $firstLine + $lineSeparator + $body
    } else {
        $newContent = $expectedHeader + $lineSeparator + $lineSeparator + $firstLine
    }

    $writer = New-Object System.IO.StreamWriter($FilePath, $false, $encoding)
    try {
        $writer.Write($newContent)
    } finally {
        $writer.Dispose()
    }
    Write-Host "Added header: $FilePath"
    return $true
}

$directories = Get-DirectoriesFromRootTsConfig -TsConfigPath $rootTsConfigPath

# Process all TypeScript files
$updatedCount = 0
$skippedCount = 0

foreach ($dir in $directories) {
    Get-ChildItem -Path $dir -Filter "*.ts" -Recurse | ForEach-Object {
        # Skip .d.ts files
        if ($_.Name -match "\.d\.ts$") {
            $skippedCount++
            return
        }

        if (Update-FileHeader -FilePath $_.FullName -WorkspaceRoot $workspaceRoot) {
            $updatedCount++
        }
    }
}

Write-Host "`nUpdate complete!"
Write-Host "Directories from root tsconfig references: $($directories.Count)"
Write-Host "Files updated: $updatedCount"
Write-Host "Files skipped: $skippedCount"