# O'reilly

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
