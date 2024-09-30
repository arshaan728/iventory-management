module.exports = {
    apps:[
        {
            http : "inventory-management",
            script: "npm",
            args : "run dev",
            env : {
                NODE_ENV : "development",
                ENV_VAR1 : "evironment-variable",
            }
        }
    ]
}