#snapweb automated tests

Before running the snapweb automated tests, following should be ready

1. Machine where tests would run should have **java** and **nodejs** installed
2. SSH keys configured on Desktop and DUT
3. snapweb service up and running on DUT at port 4201 over https

##How to run the tests:

```shell
cd tests/
./run-tests.sh <user> <ip> <port>
```

Where 

user = User on DUT with ssh keys configured
ip = IP address of DUT
port = SSH port of DUT

After test run finishes, xunit report will be generated unders ./results/ directory
If error occurs, screen shots can be found under ./errorShots/ folder
