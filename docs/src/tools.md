# Tools

- [Homebrew for mac](https://brew.sh/)
- [sdkman](https://sdkman.io/install/) : For installing and managing multiple java and gradle versions
- [nvm manager](https://github.com/nvm-sh/nvm) : For installing and managing multiple node versions


```bash
#!/bin/bash

# 1. Define the SDKMAN directory
export SDKMAN_DIR="$HOME/.sdkman"

# 2. Source the initialization script to load the 'sdk' function
if [[ -s "$SDKMAN_DIR/bin/sdkman-init.sh" ]]; then
    source "$SDKMAN_DIR/bin/sdkman-init.sh"
else
    echo "Error: SDKMAN! not found at $SDKMAN_DIR"
    exit 1
fi

# 3. Now you can use your sdk commands safely
sdk current
```
