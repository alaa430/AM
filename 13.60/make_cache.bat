@echo off
echo CACHE MANIFEST > cache.manifest
echo # Version 1.0 - %DATE% %TIME% >> cache.manifest
echo. >> cache.manifest
echo CACHE: >> cache.manifest

for /f "delims=" %%f in ('dir /b /s /a-d') do (
    set "file=%%f"
    setlocal enabledelayedexpansion
    set "rel=!file:%CD%\=!"
    set "rel=!rel:\=/!"
    if /i not "!rel!"=="make_cache.bat" if /i not "!rel!"=="cache.manifest" (
        echo !rel! >> cache.manifest
    )
    endlocal
)

echo. >> cache.manifest
echo NETWORK: >> cache.manifest
echo * >> cache.manifest
echo Done!
pause