# Bash Scripting

- GUI - Graphical way to interact with computer programs, example - clicking icons etc.
- CLI - a text-based way to interact with software and operating systems.
- shell - Program to interpret and run these CLI commands on Linux OS. shell is the outermost layer of the operating system.
- bash - Bourne-again shell is the most common implementation of shell for linux systems

directory structure
```
logs
|-- application.log
|-- system.log
```

```bash
cd logs
cat application.log                 # prints the whole file content
grep "ERROR" application.log        # filters the lines with ERROR text
grep -c "ERROR" application.log     # count of occurences after filtering
echo -e "\nNew line added"          # prints \n as -e
```

```bash
find . -name "*.log" -mtime -1
```
- `find` : command to search for files and directories
- `.` : search start from current dir
- `-name "*.log"` : pattern of file name
- `-mtime` : modification time in days
- `-1`: less than 1 day ago (modified within last 24 hours)

```sh
touch analyse-logs.sh   # creates file
vim analyse-logs.sh     # terminal text editor
# press i to go to insert mode
:wq # write and quit
```

```bash
chmod +x analyse-logs.sh
```

- `chmod` : change mode
- `+x` : add execute permission

## Shebang
all have `.sh` - how does os know if script is for bash, zsh or other shell implementation?  
`#!` tells the shell script
- `#!/bin/bash` for BASH scripts
- `#!/bin/sh` for POSIX shell scripts


## Variables

```bash
LOG_DIR="/Users/arpit/logs"
APP_LOG_FILE="application.log"
SYS_LOG_FILE="system.log"
ERROR_PATTERNS=("ERROR" "FATAL" "CRITICAL")

cat "$APP_LOG_FILE"                 # prints the whole file content
grep "ERROR" "$LOG_DIR/$APP_LOG_FILE"        # filters the lines with ERROR text
grep -c "${ERROR_PATTERNS[0]}" "$APP_LOG_FILE"     # count of occurences after filtering
echo -e "\nNew line added"          # prints \n as -e
```

## Command Substitution

```bash
LOG_FILES=$(find $LOG_DIR -name "*.log" -mtime -1)
echo $LOG_FILES
```

## for Loops and if conditions

```bash
LOG_DIR="/Users/arpit/logs"
APP_LOG_FILE="application.log"
SYS_LOG_FILE="system.log"

ERROR_PATTERNS=("ERROR" "FATAL" "CRITICAL")

echo -e "\nList of log files updated in last 24 hours"
LOG_FILES=$(find $LOG_DIR -name "*.log" -mtime -1)
echo "$LOG_FILES"

for LOG_FILE in $LOG_FILES; do
    echo -e "\n"
    echo "====================================="
    echo "====== log file - ${LOG_FILE} ======"
    echo "====================================="

    for PATTERN in ${ERROR_PATTERNS[@]}; do
        echo -e "\nSearching $PATTERN"
        grep "$PATTERN" "$LOG_FILE"

        echo -e "\nnumber of $PATTERN found"
        ERROR_COUNT=$(grep -c "$PATTERN" "$LOG_FILE")
        echo "$ERROR_COUNT"

        if [ "$ERROR_COUNT" -lt 10 ]; then
            echo -e "\nWarning!! Less than 10 $PATTERN issues in log file $LOG_FILE"
        elif [ "$ERROR_COUNT" -gt 10 ]; then
            echo -e "\nAction Required!! Too many $PATTERN issues in log file $LOG_FILE"
        fi
    done
done
```

- `[*]` - expand all elements as one big string
- `[@]` - expand each element as a separate word (used in for loops)

## Redirection Operators `>` and `>>`

- `>` : over-writes the cintent of file
- `>>` : appends to file

```bash
OUT_FILE="analysis.txt"
echo -e "\nList of log files updated in last 24 hours" > "$OUT_FILE"
LOG_FILES=$(find $LOG_DIR -name "*.log" -mtime -1)
echo "$LOG_FILES" >> "$OUT_FILE"
```
