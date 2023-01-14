const index = function ()
{
    try
    {

        return true;
    }
    catch (e)
    {
        console.error(e);
    }

    return false;
};

module.exports.findIp = index;
