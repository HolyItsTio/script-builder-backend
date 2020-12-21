export async function generateNonModularCodeBody(code) {
	return `<roblox xmlns:xmime="http://www.w3.org/2005/05/xmlmime" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://www.roblox.com/roblox.xsd" version="4">
<Meta name="ExplicitAutoJoints">true</Meta>
<External>null</External>
<External>nil</External>
<Item class="LocalScript" referent="RBX2160BD1F826C450A8F2B7E3AC77849C9">
<Properties>
<BinaryString name="AttributesSerialize"></BinaryString>
<bool name="Disabled">true</bool>
<Content name="LinkedSource"><null></null></Content>
<string name="Name">LocalScript</string>
<string name="ScriptGuid">{0E46D412-3104-4684-9119-9515C1822CF2}</string>
<ProtectedString name="Source"><![CDATA[local config = shared(script, getfenv());
local environment = config and config.environment;

local success, source = pcall(function()
	return require(script:WaitForChild("LSource"));
end);

script:ClearAllChildren();

if success then
	setfenv(0, environment);
	setfenv(1, environment);
	setfenv(source, environment);
	spawn(function()
		shared("Output", {
			Type = "general",
			Message = "Ran local script",
		});

		source();
	end);
else
	error(source, 0);
end;]]></ProtectedString>
<BinaryString name="Tags"></BinaryString>
</Properties>
<Item class="ModuleScript" referent="RBX066B198861FE488184CF42EEF7F3A894">
<Properties>
<BinaryString name="AttributesSerialize"></BinaryString>
<Content name="LinkedSource"><null></null></Content>
<string name="Name">LSource</string>
<string name="ScriptGuid">{85DF8BE5-8F00-4F18-9A2F-70F141465182}</string>
<ProtectedString name="Source"><![CDATA[return function()${code} end]]></ProtectedString>
<BinaryString name="Tags"></BinaryString>
</Properties>
</Item>
</Item>
</roblox>`;
}

export async function generateModularCodeBody(code) {
	return `<roblox xmlns:xmime="http://www.w3.org/2005/05/xmlmime" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://www.roblox.com/roblox.xsd" version="4">
	<Meta name="ExplicitAutoJoints">true</Meta>
	<External>null</External>
	<External>nil</External>
	<Item class="ModuleScript" referent="RBXECFDD826BA224DF694FE067127DED8BD">
		<Properties>
			<BinaryString name="AttributesSerialize"></BinaryString>
			<Content name="LinkedSource"><null></null></Content>
			<string name="Name">MainModule</string>
			<string name="ScriptGuid">{C0707B77-F0B6-4245-A2E9-42536217DC64}</string>
			<ProtectedString name="Source"><![CDATA[return script:WaitForChild("LocalScript");]]></ProtectedString>
			<int64 name="SourceAssetId">-1</int64>
			<BinaryString name="Tags"></BinaryString>
		</Properties>
		<Item class="LocalScript" referent="RBXE6FB12E962204135A7F89C8A51BB6CBB">
			<Properties>
				<BinaryString name="AttributesSerialize"></BinaryString>
				<bool name="Disabled">true</bool>
				<Content name="LinkedSource"><null></null></Content>
				<string name="Name">LocalScript</string>
				<string name="ScriptGuid">{5D00ECF7-779C-40DD-AA38-803C92ADDF18}</string>
				<ProtectedString name="Source"><![CDATA[local code = nil;
(function()
	code = require(script:WaitForChild("LSource"));
	script:ClearAllChildren();
end)();

if code then
	local config = shared(script, getfenv());
	local environment = config and config.environment;
	
	setfenv(0, environment);
	setfenv(1, environment);
	setfenv(code, environment);
	
	spawn(function()
		shared("Output", {
			Type = "general",
			Message = "Ran local script",
		});

		local success, message = pcall(function()
			code();
		end);

		if not success then
			error(message);
		end;
	end);
end;]]></ProtectedString>
				<int64 name="SourceAssetId">-1</int64>
				<BinaryString name="Tags"></BinaryString>
			</Properties>
			<Item class="ModuleScript" referent="RBX5AA2C017B6A14BF483E04E0E5124BF1C">
				<Properties>
					<BinaryString name="AttributesSerialize"></BinaryString>
					<Content name="LinkedSource"><null></null></Content>
					<string name="Name">LSource</string>
					<string name="ScriptGuid">{FEFFE1A7-764B-437A-9D21-81CCB46550A5}</string>
					<ProtectedString name="Source"><![CDATA[return function()${code} end;]]></ProtectedString>
					<int64 name="SourceAssetId">-1</int64>
					<BinaryString name="Tags"></BinaryString>
				</Properties>
			</Item>
		</Item>
	</Item>
</roblox>`;
}

export function generateDefaultScriptBody() {
	return `<roblox xmlns:xmime="http://www.w3.org/2005/05/xmlmime" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://www.roblox.com/roblox.xsd" version="4">
	<Meta name="ExplicitAutoJoints">true</Meta>
	<External>null</External>
	<External>nil</External>
	<Item class="LocalScript" referent="RBX8F1898E19EB14A1E8C32432994345681">
		<Properties>
			<BinaryString name="AttributesSerialize"></BinaryString>
			<bool name="Disabled">false</bool>
			<Content name="LinkedSource"><null></null></Content>
			<string name="Name">LocalScript</string>
			<string name="ScriptGuid">{E7471891-8A97-443C-8AD6-CA6706FA96DF}</string>
			<ProtectedString name="Source">print(&quot;Hello world!&quot;)</ProtectedString>
			<int64 name="SourceAssetId">-1</int64>
			<BinaryString name="Tags"></BinaryString>
		</Properties>
	</Item>
</roblox>`;
}

export async function generateError(errorMessage, code) {
	return new Response(JSON.stringify({ error: true, message: errorMessage }), {
		status: code || 400,
		headers: {
			"content-type": "application/json"
		}
	});
}

export async function generateSuccess(message) {
	return new Response(JSON.stringify({ error: false, message: message }), {
		status: 200,
		headers: {
			"content-type": "application/json"
		}
	});
}