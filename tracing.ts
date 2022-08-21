import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { SimpleSpanProcessor, ConsoleSpanExporter } from "@opentelemetry/sdk-trace-base";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { trace, Tracer } from "@opentelemetry/api";
import { JaegerExporter } from "@opentelemetry/exporter-jaeger";

export default function initializeTracing(serviceName: string): Tracer {
    const provider = new NodeTracerProvider({
        resource: new Resource({
            [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
        }),
    });

    const consoleExporter = new ConsoleSpanExporter()
    const jaegerExporter = new JaegerExporter({
        endpoint: "http://localhost:14268/api/traces",
    });

    provider.addSpanProcessor(new SimpleSpanProcessor(jaegerExporter));
    provider.addSpanProcessor(new SimpleSpanProcessor(consoleExporter));

    provider.register();

    return trace.getTracer(serviceName);
};