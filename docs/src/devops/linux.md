# Linux

Linux is a free and open-source operating system (OS) kernel, and the term is also commonly used to refer to the complete operating systems built using this kernel, known as **Linux distributions**.  
  
It's a popular alternative to operating systems like Windows or macOS, known for its flexibility, security, and open-source nature. 

# Key Terms

**The Kernel**: Linux, in its core, is a kernel, which is the fundamental part of an operating system. 
- The kernel acts as an interface between the hardware and the software, managing resources like memory and CPU time.
- It was initially created by Linus Torvalds in 1991. 

**Linux Distributions**: Because the kernel alone isn't enough to run a computer, it's combined with other software (like GNU tools) to create a complete operating system. 
- These complete systems are called Linux distributions or "distros". 
- Examples of popular distributions include Ubuntu, Fedora, Debian, and many others. 

**Common Uses**:
- **Servers**: Linux is widely used on web servers, database servers, and other server applications.
- **Desktops**: Linux distributions are available for desktop computers, offering a user-friendly alternative to Windows and macOS. 
- **Embedded Systems**: Linux is used in a wide range of embedded devices, including smartphones (Android is based on Linux), routers, and smart TVs. 
- **Supercomputers**: The vast majority of the world's most powerful supercomputers run on Linux. 

# Linux OS version

files in the `/etc` directory that end with `-release` typically contain information about the Linux distribution and version.

```sh
cat /etc/*-release
```

[![dir structure](https://miro.medium.com/v2/resize:fit:720/format:webp/0*bFnHaO8eYpW3dSuz)](https://blog.fourninecloud.com/linux-file-system-hierarchy-explained-1d80b2cee03c){target="_blank"}

# socket statistics

> Other options to see [port in use](https://www.cyberciti.biz/faq/unix-linux-check-if-port-is-in-use-command/){target="_blank"}

The ss command in Linux is used to display socket statistics.  
It provides detailed information about network connections and sockets, including TCP, UDP, and Unix domain sockets.  
It's a modern replacement for the netstat command and offers more features and performance.  

```sh
ss -tulpn | grep LISTEN
```

## ss commands

Here's a breakdown of common ss commands and their uses:

**Basic Usage**
```sh
ss: Displays all established socket connections.
ss -l: Lists all listening sockets (sockets waiting for incoming connections).
ss -a: Displays both listening and non-listening sockets.
ss -t: Displays all TCP sockets.
ss -u: Displays all UDP sockets.
ss -x: Displays all Unix domain sockets.
ss -s: Displays summary statistics about socket usage. 
ss -p: Show the process using the socket.
ss -n: Show numerical addresses instead of resolving hostnames.
```

**Filtering**
```sh
ss -o state established 'dport = :22': Displays all established TCP connections to port 22 (SSH).
# Lists all TCP sockets in FIN-WAIT-1 state connected to the network 193.233.7/24 for HTTP and HTTPS.
ss -o state fin-wait-1 '( sport = :http or sport = :https )' dst 193.233.7/24
ss sport = :80: Displays sockets with a source port of 80 (typically HTTP).
ss dport = :443: Displays sockets with a destination port of 443 (typically HTTPS).
ss -6: Displays IPv6 sockets in addition to IPv4.
ss -4: Displays IPv4 sockets (this is the default if -6 is not specified).
```

**Advanced Options**
```sh
ss -o: Displays timer information related to sockets, such as retransmission and keepalive values.
ss -m: Displays socket memory usage.
ss -i: Displays internal TCP information.
ss -p: Displays the processes using the sockets.

Other Useful Examples:
ss -tuln: Lists all listening TCP and UDP ports numerically. 
ss -a -Z: Displays all TCP sockets with SELinux security contexts. 
ss -x src /tmp/.X11-unix/*: Finds all local processes connected to the X server. 
```

## Installation
The ss command is usually pre-installed on most Linux distributions. If it's not, you can install it via iproute or iproute2 packages (e.g., sudo apt install iproute2 on Debian/Ubuntu systems). 

# Find

```sh
find . -type f -name "*my-service*.log"
```

## SSH Agents

To use an SSH agent in an Alpine Linux environment, you'll need to install the openssh-client package and potentially use the keychain package to manage the agent. This allows you to store your SSH private key in memory and avoid repeatedly entering your passphrase. 

Install the keychain package. keychain helps manage SSH agent sessions, ensuring that they are running even after you log out or close a terminal. Add eval $(keychain) to your ~/.bashrc or ~/.bash_profile file to automatically start keychain when you start a shell. 

Explanation:
* openssh-client: Provides the necessary tools for SSH, including ssh-agent and ssh-add.
* ssh-agent: A daemon that stores your SSH keys in memory.
* ssh-add: Adds a key to the SSH agent.
* keychain: A utility that helps manage SSH agent sessions across multiple shells and even after logging out. It can automatically restart the agent if it's killed. 
