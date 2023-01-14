/** to-esm-browser: remove **/
const os = require("os");
/**
 * @link https://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js
 * @returns {{}|[]|null}
 */
const getIps = ({allInfo = false} = {}) =>
{
    try
    {
        const {networkInterfaces} = os;
        const nets = networkInterfaces();
        const results = {};
        const arr = [];

        for (const name of Object.keys(nets))
        {
            for (const net of nets[name])
            {
                const familyV4Value = typeof net.family === "string" ? "IPv4" : 4;
                if (net.family === familyV4Value && !net.internal)
                {
                    results[name] = results[name] || [];

                    if (allInfo)
                    {
                        arr.push(Object.assign({name}, net));
                    }
                    else
                    {
                        results[name].push(net.address);
                    }
                }
            }
        }

        if (allInfo)
        {
            return arr;
        }

        return results;
    }
    catch (e)
    {
        console.error({lid: 4321}, e.message);
    }

    return null;
};

/**
 * Return ips only
 */
const getIpList = () =>
{
    let ipList = [];
    const detectedIps = getIps();
    const list = Object.values(detectedIps);
    for (let i = 0; i < list.length; ++i)
    {
        const ips = list[i] || [];
        ipList.push(...ips);
    }

    ipList = [...new Set(ipList)];
    return ipList;
};

const getIpInfoList = () =>
{
    try
    {
        const list = getIps({allInfo: true});

        for (let i = 0; i < list.length; ++i)
        {
            let priorities = 0;

            const info = list[i];
            const networkName = info.name.toLowerCase();
            const address = info.address;
            const netmask = info.netmask;
            let cidr;
            cidr = info.cidr.split("/");
            cidr[1] = parseInt(cidr[1]);

            if (networkName.includes("vmware") || networkName.includes("vmnet") || networkName.includes("vEthernet") ||
                networkName.includes("(WSL)") || networkName.includes("virtual") || networkName.includes("vbox"))
            {
                priorities += 1;
            }
            else if (networkName.includes("wifi") || networkName.includes("wi-fi") || networkName.includes("wireless"))
            {
                priorities += 3;
            }
            else if (/\bppp/.test(networkName))
            {
                priorities += 2;
            }
            else if (/\bwlan/.test(networkName))
            {
                priorities += 3;
            }
            else if (/\bethernet/.test(networkName) || /\beth/.test(networkName))
            {
                priorities += 5;
            }

            if (address.startsWith("172."))
            {
                priorities += 1;
            }
            else if (address.startsWith("192.168."))
            {
                priorities += 3;
            }

            if (netmask.includes("255.255.255."))
            {
                priorities += 3;
            }
            else if (netmask.includes("255.255."))
            {
                priorities += 1;
            }

            if (cidr[0].startsWith("172."))
            {
                priorities += 1;
            }
            else if (cidr[0].startsWith("192.168."))
            {
                priorities += 4;
            }
            else if (cidr[0].startsWith("192.168.1."))
            {
                priorities += 5;
            }

            // TODO: Add does not end with a .1 => priority +1

            if (cidr[1] >= 24)
            {
                priorities += 2;
            }
            else if (cidr[1] >= 16)
            {
                priorities += 1;
            }

            info.priority = priorities;
        }

        return list.sort((info1, info2) => info1.priority > info2.priority ? -1 : 1);
    }
    catch (e)
    {
        console.error({lid: 4321}, e.message);
    }

    return [];
};

/**
 * Try to best guess local ip
 * @returns {string|(() => AddressInfo)|(() => (AddressInfo | {}))|(() => (AddressInfo | string | null))|boolean}
 */
const findIp = () =>
{
    const list = getIpInfoList();
    return list[0].address;
};
/** to-esm-browser: end-remove **/

module.exports.getIps = getIps;
module.exports.getIpList = getIpList;
module.exports.findIp = findIp;
