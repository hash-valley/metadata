import json


def format_json(num, mints, v1minter):
    if v1minter:
        message = "Thank you for being an early supporter of Hash Valley. You've received a giveaway token for each V1 mint that can be redeemed for a free vineyard at the launch"
        attributes = [{"trait_type": "V1 Mints", "value": mints}]
    else:
        message = "Thank you for being an early supporter of Hash Valley. You've received giveaway tokens for that can be redeemed for a free vineyard at the launch"
        attributes = [{"trait_type": "Bonus", "value": mints}]

    ty_json = json.dumps(
        {
            "name": f"Hash Valley Winery Early Supporter #{num}",
            "external_url": "https://hashvalley.xyz",
            "image": "ipfs://QmSUcGhzAQWo1EF42Yqj8XLX4LfHShMsrLwrtKE1z9KSV1",
            "description": message,
            "attributes": attributes
        },
        indent=4)

    # Writing to sample.json
    with open(f"ty/{num}.json", "w") as outfile:
        outfile.write(ty_json)


import os
  
# checking if the directory demo_folder 
# exist or not.
if not os.path.exists("ty"):
      
    # if the demo_folder directory is not present 
    # then create it.
    os.makedirs("ty")

v1_minters = [17, 3, 15, 7, 6, 1, 9, 19, 1, 5, 4, 4, 8]
other = 6
for i in range(len(v1_minters) + other):
    if i < 13:
        format_json(i, v1_minters[i], True)
    else:
        format_json(i, 3, False)
