# Product name 
Tokenholic

# Product Description
A agentic AI tool to enable Alibaba Cloud sales teams to win LLM token opportunities from their customers, including the following key features

- identify MaaS (Model as a service) opportunity for their customers based on their industry, public information, and peers, generate a "token battle map", refer to this [image](/Token白板图.png) as a sample
- recommend service and solution based on each customer's unique use case and usage scenario.
- role play with sales team to help them to better prepare the engagement with customer.
- refine the solution based on customer feedback which the sales will bring back


# Technical Requirements
- a fancy, modern, interactive, sleek UI/frontend that give visually striking impacts for the end user, use frontend-design skill, users love to use it on desktop or mobile. Use vite+ react
- the backend use python to build multi-agent system, leverage agentscope framework (https://doc.agentscope.io/zh_CN/index.html#)
- when need to use sandbox for brosweruse, computeruse, codespace, use agentbay, https://github.com/agentbay-ai/wuying-agentbay-sdk/tree/main/docs, i will provide api-key
- leverage bailian to access LLM, test and select Qwen3-Max-thinking for planning agent, GLM 5.0 for coding and other tesk execution。 Bailian doc - https://help.aliyun.com/zh/model-studio/what-is-model-studio
- consider cloud deployment, all the backend code should be easily deploy to alibaba cloud, start with an ecs first, use docker so that we can migrate the other stack quickly (like function compute, acs)