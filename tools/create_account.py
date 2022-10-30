from vulcan import Keystore, Account
import asyncio
import json

async def main():
    token = input("Token: ")
    symbol = input("Symbol: ")
    pin = input("PIN: ")

    print()
    
    keystore = await Keystore.create(device_model="Vulcan API")
    account = await Account.register(keystore, token=token, symbol=symbol, pin=pin)

    with open("keystore.json", "w") as file:
        json.dump(keystore.as_dict, file, indent=4)
    
    with open("account.json", "w") as file:
        json.dump(account.as_dict, file, indent=4)

if __name__ == "__main__":
    asyncio.run(main())