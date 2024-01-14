const { type, name } = $arguments
if (type == "1") {
  subtype = 'collection'
} else {
  subtype = 'subscription'
}

let config = JSON.parse($files[0])
let proxies = JSON.parse(await produceArtifact({
  type: subtype,
  name: name,
  platform: 'sing-box'
}))

proxies.map(p => {
  config.outbounds.push(p)
  config.outbounds.map(i => {
    if (['All'].includes(i.tag)) {
      i.outbounds.push(p.tag)
    }
  })
})
proxies.filter(p => /港|hk|hongkong|kong kong|🇭🇰/i.test(p.tag)).map(p => {
  config.outbounds.map(i => {
    if (['Hong Kong'].includes(i.tag)) {
      i.outbounds.push(p.tag)
    }
  })
})
proxies.filter(p => /台|tw|taiwan|🇹🇼/i.test(p.tag)).map(p => {
  config.outbounds.map(i => {
    if (['Taiwan'].includes(i.tag)) {
      i.outbounds.push(p.tag)
    }
  })
})
proxies.filter(p => /日本|jp|japan|🇯🇵/i.test(p.tag)).map(p => {
  config.outbounds.map(i => {
    if (['Japan'].includes(i.tag)) {
      i.outbounds.push(p.tag)
    }
  })
})
proxies.filter(p => /^(?!.*(?:us)).*(新|sg|singapore|🇸🇬)/i.test(p.tag)).map(p => {
  config.outbounds.map(i => {
    if (['Singapore'].includes(i.tag)) {
      i.outbounds.push(p.tag)
    }
  })
})
proxies.filter(p => /美|us|unitedstates|united states|🇺🇸/i.test(p.tag)).map(p => {
  config.outbounds.map(i => {
    if (['USA'].includes(i.tag)) {
      i.outbounds.push(p.tag)
    }
  })
})

$content = JSON.stringify(config, null, 2)
