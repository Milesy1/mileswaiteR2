@echo off
cd /d "C:\Users\Allens\modular"
echo.
echo Checking git status...
git status
echo.
echo Adding all updated files...
git add .
echo.
echo Committing changes...
git commit -m "Complete website enhancement: perfect animations, space-age grey cube, mileswaite.net branding, enhanced hover effects, and gradient backgrounds"
echo.
echo Pushing to GitHub...
git push origin master
echo.
echo Done! Press any key to exit.
pause > nul