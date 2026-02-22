import { useState, useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import * as d3 from 'd3'

// Types
interface TokenNode {
  id: string
  name: string
  provider: string
  tokens: number
  confidence: number
  isEditable?: boolean
  children?: TokenNode[]
  description?: string
}

interface LayerData {
  id: string
  name: string
  nameEn: string
  icon: string
  color: string
  glowColor: string
  categories: CategoryData[]
  expanded?: boolean
}

interface CategoryData {
  id: string
  name: string
  useCases: UseCaseData[]
  expanded?: boolean
}

interface UseCaseData {
  id: string
  name: string
  provider: string
  model: string
  tokens: number
  confidence: number
  isEditable?: boolean
  description?: string
}

// Provider configuration with cyberpunk colors
const PROVIDERS = {
  alibaba: { name: 'Alibaba Cloud', color: '#FF6A00', glow: 'rgba(255, 106, 0, 0.5)' },
  volcengine: { name: 'Volcengine', color: '#00D4AA', glow: 'rgba(0, 212, 170, 0.5)' },
  baidu: { name: 'Baidu Cloud', color: '#2932E1', glow: 'rgba(41, 50, 225, 0.5)' },
  overseas: { name: 'Overseas', color: '#A855F7', glow: 'rgba(168, 85, 247, 0.5)' },
  selfhosted: { name: 'Self-hosted', color: '#EC4899', glow: 'rgba(236, 72, 153, 0.5)' },
  other: { name: 'Other', color: '#6B7280', glow: 'rgba(107, 114, 128, 0.5)' },
}

// Mock data based on the whiteboard image
const generateMockData = (companyName: string): LayerData[] => [
  {
    id: 'external',
    name: '对外业务层',
    nameEn: 'External Business Layer',
    icon: '🌐',
    color: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    categories: [
      {
        id: 'script',
        name: 'Script Creation',
        useCases: [
          { id: 'sc1', name: 'Assistant Creation', provider: 'alibaba', model: 'Qwen Plus', tokens: 1200000000, confidence: 0.85, description: 'AI-assisted script writing' },
          { id: 'sc2', name: 'Assistant Creation', provider: 'volcengine', model: 'Qwen-image', tokens: 800000000, confidence: 0.7, description: 'Image-based generation' },
          { id: 'sc3', name: 'Script Rewrite', provider: 'overseas', model: 'Gemini', tokens: 500000000, confidence: 0.9, description: 'Script optimization' },
          { id: 'sc4', name: 'Storyboard Script', provider: 'alibaba', model: 'Doubao 1.6', tokens: 600000000, confidence: 0.75, isEditable: true },
        ],
        expanded: true,
      },
      {
        id: 'storyboard',
        name: 'Storyboard Generation',
        useCases: [
          { id: 'sb1', name: 'Character Design', provider: 'alibaba', model: 'Seedream 4.0', tokens: 900000000, confidence: 0.88 },
          { id: 'sb2', name: 'Style Design', provider: 'volcengine', model: 'Qwen-image', tokens: 700000000, confidence: 0.72 },
          { id: 'sb3', name: 'Style Design', provider: 'alibaba', model: 'Nano Banana', tokens: 400000000, confidence: 0.65, isEditable: true },
          { id: 'sb4', name: 'Scene Segmentation', provider: 'alibaba', model: 'Seedream 4.0', tokens: 550000000, confidence: 0.8 },
          { id: 'sb5', name: 'Scene Segmentation', provider: 'volcengine', model: 'Qwen-image', tokens: 350000000, confidence: 0.6, isEditable: true },
        ],
      },
      {
        id: 'video',
        name: 'Video Production',
        useCases: [
          { id: 'vp1', name: 'Single Shot Video', provider: 'alibaba', model: 'Wan2.5', tokens: 1500000000, confidence: 0.92, description: 'High-quality single shot generation' },
          { id: 'vp2', name: 'Multi-shot Video', provider: 'volcengine', model: 'Veo3.1', tokens: 1100000000, confidence: 0.78 },
          { id: 'vp3', name: 'Camera Movement', provider: 'alibaba', model: 'Seedance', tokens: 800000000, confidence: 0.85 },
          { id: 'vp4', name: 'Video Composition', provider: 'alibaba', model: 'Seedance', tokens: 600000000, confidence: 0.82 },
        ],
      },
      {
        id: 'audio',
        name: 'Audio & Voice',
        useCases: [
          { id: 'av1', name: 'Character Dubbing', provider: 'alibaba', model: 'ASR', tokens: 400000000, confidence: 0.88 },
          { id: 'av2', name: 'Scene SFX', provider: 'alibaba', model: 'ASR', tokens: 300000000, confidence: 0.75 },
          { id: 'av3', name: 'Background Music', provider: 'alibaba', model: 'Seed Realtime Voice', tokens: 250000000, confidence: 0.7, isEditable: true },
          { id: 'av4', name: 'Scene Segmentation', provider: 'alibaba', model: 'Cosyvoice', tokens: 200000000, confidence: 0.68 },
          { id: 'av5', name: 'Scene Segmentation', provider: 'alibaba', model: 'Seed Realtime Voice', tokens: 180000000, confidence: 0.65, isEditable: true },
        ],
      },
      {
        id: 'editing',
        name: 'Editing & Packaging',
        useCases: [
          { id: 'ep1', name: 'Package Transfer', provider: 'alibaba', model: 'Seedance', tokens: 450000000, confidence: 0.8 },
          { id: 'ep2', name: 'Package Transfer', provider: 'alibaba', model: 'Wan2.5', tokens: 380000000, confidence: 0.75 },
        ],
      },
    ],
    expanded: true,
  },
  {
    id: 'internal',
    name: '对内平台层',
    nameEn: 'Internal Platform Layer',
    icon: '🏢',
    color: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    categories: [
      {
        id: 'datacleaning',
        name: 'Data Cleaning',
        useCases: [
          { id: 'dc1', name: 'Data Ingestion Cleaning', provider: 'alibaba', model: 'Qwen-Plus', tokens: 600000000, confidence: 0.9 },
          { id: 'dc2', name: 'Data Ingestion Cleaning', provider: 'alibaba', model: 'Doubao 1.6', tokens: 450000000, confidence: 0.82 },
        ],
      },
      {
        id: 'efficiency',
        name: 'Internal Efficiency',
        useCases: [
          { id: 'ie1', name: 'Knowledge Base - Lindorm', provider: 'alibaba', model: 'Embedding', tokens: 800000000, confidence: 0.95, description: 'Internal knowledge retrieval' },
          { id: 'ie2', name: 'Coding Assistant', provider: 'alibaba', model: 'Coder', tokens: 500000000, confidence: 0.88 },
        ],
      },
      {
        id: 'other',
        name: 'Other Products',
        useCases: [
          { id: 'op1', name: 'Cloud Products', provider: 'alibaba', model: 'xx Products', tokens: 300000000, confidence: 0.6, isEditable: true, description: 'Various cloud integrations' },
        ],
      },
    ],
  },
  {
    id: 'resource',
    name: '资源大盘',
    nameEn: 'Resource Dashboard',
    icon: '📊',
    color: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    categories: [
      {
        id: 'aliresource',
        name: 'Alibaba Cloud Resources',
        useCases: [
          { id: 'ar1', name: 'Text Model', provider: 'alibaba', model: 'Qwen-plus', tokens: 2000000000, confidence: 0.95 },
          { id: 'ar2', name: 'Vision Model', provider: 'alibaba', model: 'Qwen-VL', tokens: 1500000000, confidence: 0.92 },
          { id: 'ar3', name: 'Video Generation', provider: 'alibaba', model: 'Wan', tokens: 1200000000, confidence: 0.88 },
          { id: 'ar4', name: 'Speech Model', provider: 'alibaba', model: 'ASR', tokens: 800000000, confidence: 0.9 },
        ],
      },
      {
        id: 'volcresource',
        name: 'Volcengine Resources',
        useCases: [
          { id: 'vr1', name: 'Text Model', provider: 'volcengine', model: 'Seed 1.6', tokens: 1000000000, confidence: 0.85 },
          { id: 'vr2', name: 'Vision Model', provider: 'volcengine', model: 'Seed 1.5', tokens: 800000000, confidence: 0.8 },
          { id: 'vr3', name: 'Video Generation', provider: 'volcengine', model: 'Seedream', tokens: 600000000, confidence: 0.75 },
          { id: 'vr4', name: 'Speech Model', provider: 'volcengine', model: 'Realtime Voice', tokens: 400000000, confidence: 0.78 },
        ],
      },
      {
        id: 'geminiresource',
        name: 'Gemini Resources',
        useCases: [
          { id: 'gr1', name: 'Text Model', provider: 'overseas', model: 'Gemini', tokens: 500000000, confidence: 0.7, isEditable: true },
          { id: 'gr2', name: 'Vision Model', provider: 'overseas', model: 'Gemini Vision', tokens: 300000000, confidence: 0.65, isEditable: true },
        ],
      },
      {
        id: 'selfhosted',
        name: 'Self-hosted IDC',
        useCases: [
          { id: 'sh1', name: 'Custom Models', provider: 'selfhosted', model: 'Various', tokens: 400000000, confidence: 0.5, isEditable: true, description: 'Self-deployed models' },
        ],
      },
    ],
  },
]

// Format large numbers
const formatTokens = (num: number): string => {
  if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toString()
}

// Editable Input Component
const EditableTokenInput = ({ 
  value, 
  onChange, 
  isEditable 
}: { 
  value: number
  onChange: (val: number) => void
  isEditable?: boolean 
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(value.toString())

  if (!isEditable) {
    return <span className="font-mono text-cyan-400">{formatTokens(value)}</span>
  }

  if (isEditing) {
    return (
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={() => {
          const parsed = parseFloat(inputValue.replace(/[^0-9.]/g, ''))
          if (!isNaN(parsed)) {
            onChange(parsed * (inputValue.toLowerCase().includes('b') ? 1000000000 : 
                              inputValue.toLowerCase().includes('m') ? 1000000 : 
                              inputValue.toLowerCase().includes('k') ? 1000 : 1))
          }
          setIsEditing(false)
        }}
        onKeyDown={(e) => e.key === 'Enter' && (e.target as HTMLInputElement).blur()}
        className="w-20 bg-transparent border-b border-cyan-400 text-cyan-400 font-mono text-sm focus:outline-none"
        autoFocus
      />
    )
  }

  return (
    <button
      onClick={() => setIsEditing(true)}
      className="font-mono text-cyan-400 border-b border-dashed border-cyan-400/50 hover:border-cyan-400 transition-colors cursor-text"
    >
      {formatTokens(value)}
      <span className="ml-1 text-xs text-cyan-400/50">✎</span>
    </button>
  )
}

// Use Case Card Component
const UseCaseCard = ({ 
  useCase, 
  onUpdate,
  index 
}: { 
  useCase: UseCaseData
  onUpdate: (id: string, tokens: number) => void
  index: number
}) => {
  const provider = PROVIDERS[useCase.provider as keyof typeof PROVIDERS] || PROVIDERS.other
  
  return (
    <div
      className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-lg p-4 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
      style={{ 
        animationDelay: `${index * 50}ms`,
        animation: 'cardSlideIn 0.4s ease-out forwards',
        opacity: 0,
      }}
    >
      {/* Provider indicator */}
      <div 
        className="absolute top-0 left-0 w-1 h-full rounded-l-lg"
        style={{ backgroundColor: provider.color, boxShadow: `0 0 10px ${provider.glow}` }}
      />
      
      {/* Content */}
      <div className="pl-3">
        <div className="flex items-start justify-between mb-2">
          <h4 className="text-white font-medium text-sm leading-tight">{useCase.name}</h4>
          {useCase.isEditable && (
            <span className="px-1.5 py-0.5 bg-amber-500/20 text-amber-400 text-[10px] rounded-full border border-amber-500/30">
              EDITABLE
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2 mb-2">
          <span 
            className="px-2 py-0.5 rounded text-[10px] font-medium"
            style={{ 
              backgroundColor: `${provider.color}20`, 
              color: provider.color,
              boxShadow: `0 0 8px ${provider.glow}`
            }}
          >
            {useCase.model}
          </span>
          <span className="text-slate-500 text-[10px]">|</span>
          <span className="text-slate-400 text-[10px]">{provider.name}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-xs">Tokens:</span>
            <EditableTokenInput 
              value={useCase.tokens} 
              onChange={(val) => onUpdate(useCase.id, val)}
              isEditable={useCase.isEditable}
            />
          </div>
          
          {/* Confidence bar */}
          <div className="flex items-center gap-2">
            <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${useCase.confidence * 100}%`,
                  backgroundColor: useCase.confidence > 0.8 ? '#10B981' : useCase.confidence > 0.6 ? '#F59E0B' : '#EF4444',
                }}
              />
            </div>
            <span className="text-[10px] text-slate-500">{Math.round(useCase.confidence * 100)}%</span>
          </div>
        </div>
        
        {useCase.description && (
          <p className="mt-2 text-[11px] text-slate-500 leading-relaxed">{useCase.description}</p>
        )}
      </div>
    </div>
  )
}

// Category Section Component
const CategorySection = ({ 
  category, 
  onToggle, 
  onUpdateUseCase,
  categoryIndex
}: { 
  category: CategoryData
  onToggle: () => void
  onUpdateUseCase: (id: string, tokens: number) => void
  categoryIndex: number
}) => {
  const totalTokens = category.useCases.reduce((sum, uc) => sum + uc.tokens, 0)
  
  return (
    <div 
      className="mb-4"
      style={{
        animationDelay: `${categoryIndex * 100}ms`,
        animation: 'fadeSlideUp 0.5s ease-out forwards',
        opacity: 0,
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/30 hover:border-slate-600/50 transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className={`transform transition-transform duration-200 ${category.expanded ? 'rotate-90' : ''}`}>
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <span className="text-white font-medium">{category.name}</span>
          <span className="px-2 py-0.5 bg-slate-700/50 rounded-full text-[10px] text-slate-400">
            {category.useCases.length} use cases
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-cyan-400 text-sm">{formatTokens(totalTokens)}</span>
        </div>
      </button>
      
      {category.expanded && (
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pl-7">
          {category.useCases.map((useCase, index) => (
            <UseCaseCard 
              key={useCase.id} 
              useCase={useCase} 
              onUpdate={onUpdateUseCase}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Layer Card Component
const LayerCard = ({ 
  layer, 
  onToggle, 
  onCategoryToggle,
  onUpdateUseCase,
  layerIndex
}: { 
  layer: LayerData
  onToggle: () => void
  onCategoryToggle: (categoryId: string) => void
  onUpdateUseCase: (useCaseId: string, tokens: number) => void
  layerIndex: number
}) => {
  const totalTokens = layer.categories.reduce(
    (sum, cat) => sum + cat.useCases.reduce((s, uc) => s + uc.tokens, 0), 
    0
  )
  
  const providerBreakdown = layer.categories.flatMap(c => c.useCases).reduce((acc, uc) => {
    acc[uc.provider] = (acc[uc.provider] || 0) + uc.tokens
    return acc
  }, {} as Record<string, number>)
  
  return (
    <div 
      className="mb-6 rounded-2xl overflow-hidden"
      style={{
        animationDelay: `${layerIndex * 150}ms`,
        animation: 'layerSlideIn 0.6s ease-out forwards',
        opacity: 0,
      }}
    >
      {/* Layer Header */}
      <button
        onClick={onToggle}
        className="w-full relative p-5 transition-all duration-300 group"
        style={{
          background: `linear-gradient(135deg, ${layer.color}15 0%, ${layer.color}05 100%)`,
          borderLeft: `4px solid ${layer.color}`,
          boxShadow: layer.expanded ? `0 0 30px ${layer.glowColor}` : 'none',
        }}
      >
        {/* Animated glow effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${layer.glowColor} 0%, transparent 70%)`,
          }}
        />
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-3xl">{layer.icon}</span>
            <div className="text-left">
              <h3 className="text-xl font-bold text-white">{layer.name}</h3>
              <p className="text-sm text-slate-400">{layer.nameEn}</p>
            </div>
            <span className="px-3 py-1 bg-slate-800/50 rounded-full text-xs text-slate-300 border border-slate-700/50">
              {layer.categories.length} categories
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Provider mini-chart */}
            <div className="flex items-center gap-1">
              {Object.entries(providerBreakdown).slice(0, 4).map(([provider, tokens]) => {
                const prov = PROVIDERS[provider as keyof typeof PROVIDERS] || PROVIDERS.other
                const percentage = (tokens / totalTokens) * 100
                return (
                  <div 
                    key={provider}
                    className="h-8 rounded-sm transition-all duration-300 group-hover:h-10"
                    style={{ 
                      width: `${Math.max(percentage * 0.8, 4)}px`,
                      backgroundColor: prov.color,
                      boxShadow: `0 0 10px ${prov.glow}`,
                    }}
                    title={`${prov.name}: ${formatTokens(tokens)}`}
                  />
                )
              })}
            </div>
            
            <div className="text-right">
              <div className="font-mono text-2xl font-bold" style={{ color: layer.color }}>
                {formatTokens(totalTokens)}
              </div>
              <div className="text-xs text-slate-500">total tokens</div>
            </div>
            
            <div className={`transform transition-transform duration-300 ${layer.expanded ? 'rotate-180' : ''}`}>
              <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </button>
      
      {/* Layer Content */}
      {layer.expanded && (
        <div className="p-5 bg-slate-900/50 border-l-4 border-t-0" style={{ borderColor: layer.color }}>
          {layer.categories.map((category, index) => (
            <CategorySection
              key={category.id}
              category={category}
              onToggle={() => onCategoryToggle(category.id)}
              onUpdateUseCase={onUpdateUseCase}
              categoryIndex={index}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Provider Distribution Chart
const ProviderChart = ({ data }: { data: LayerData[] }) => {
  const chartRef = useRef<SVGSVGElement>(null)
  
  const providerTotals = data.flatMap(l => l.categories.flatMap(c => c.useCases)).reduce((acc, uc) => {
    acc[uc.provider] = (acc[uc.provider] || 0) + uc.tokens
    return acc
  }, {} as Record<string, number>)
  
  const total = Object.values(providerTotals).reduce((a, b) => a + b, 0)
  
  useEffect(() => {
    if (!chartRef.current) return
    
    const svg = d3.select(chartRef.current)
    svg.selectAll('*').remove()
    
    const width = 200
    const height = 200
    const radius = Math.min(width, height) / 2 - 10
    
    const g = svg.append('g').attr('transform', `translate(${width/2},${height/2})`)
    
    const pie = d3.pie<[string, number]>().value(d => d[1]).sort(null)
    const arc = d3.arc<d3.PieArcDatum<[string, number]>>().innerRadius(radius * 0.6).outerRadius(radius)
    
    const data = Object.entries(providerTotals)
    const arcs = g.selectAll('arc').data(pie(data)).enter().append('g')
    
    arcs.append('path')
      .attr('d', arc)
      .attr('fill', d => PROVIDERS[d.data[0] as keyof typeof PROVIDERS]?.color || '#6B7280')
      .attr('stroke', '#0f172a')
      .attr('stroke-width', 2)
      .style('filter', d => `drop-shadow(0 0 8px ${PROVIDERS[d.data[0] as keyof typeof PROVIDERS]?.glow || 'rgba(107,114,128,0.5)'})`)
      .style('opacity', 0)
      .transition()
      .duration(800)
      .delay((_, i) => i * 100)
      .style('opacity', 1)
      .attrTween('d', function(d) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d)
        return (t) => arc(interpolate(t)) || ''
      })
    
    // Center text
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.5em')
      .attr('fill', '#fff')
      .attr('font-size', '24px')
      .attr('font-weight', 'bold')
      .attr('font-family', 'monospace')
      .text(formatTokens(total))
    
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.5em')
      .attr('fill', '#64748b')
      .attr('font-size', '12px')
      .text('Total Tokens')
      
  }, [providerTotals, total])
  
  return (
    <div className="flex items-center gap-6">
      <svg ref={chartRef} width={200} height={200} />
      <div className="space-y-2">
        {Object.entries(providerTotals).map(([provider, tokens]) => {
          const prov = PROVIDERS[provider as keyof typeof PROVIDERS] || PROVIDERS.other
          const percentage = ((tokens / total) * 100).toFixed(1)
          return (
            <div key={provider} className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: prov.color, boxShadow: `0 0 8px ${prov.glow}` }}
              />
              <span className="text-sm text-slate-300 w-24">{prov.name}</span>
              <span className="font-mono text-cyan-400 text-sm">{formatTokens(tokens)}</span>
              <span className="text-slate-500 text-xs">({percentage}%)</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// AI Gateway Stats
const AIGatewayStats = ({ data }: { data: LayerData[] }) => {
  const total = data.flatMap(l => l.categories.flatMap(c => c.useCases)).reduce((sum, uc) => sum + uc.tokens, 0)
  const alibabaTokens = data.flatMap(l => l.categories.flatMap(c => c.useCases))
    .filter(uc => uc.provider === 'alibaba')
    .reduce((sum, uc) => sum + uc.tokens, 0)
  const volcTokens = data.flatMap(l => l.categories.flatMap(c => c.useCases))
    .filter(uc => uc.provider === 'volcengine')
    .reduce((sum, uc) => sum + uc.tokens, 0)
  
  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-5 border border-slate-700/30">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        AI Gateway Coverage
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-slate-400 text-sm">Gateway Coverage Rate</span>
          <span className="font-mono text-cyan-400">85%</span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" style={{ width: '85%' }} />
        </div>
        <div className="text-xs text-slate-500 space-y-1">
          <p>Token Distribution via Gateway:</p>
          <p>• Alibaba Cloud: {formatTokens(alibabaTokens)} ({((alibabaTokens/total)*100).toFixed(1)}%)</p>
          <p>• Volcengine: {formatTokens(volcTokens)} ({((volcTokens/total)*100).toFixed(1)}%)</p>
        </div>
      </div>
    </div>
  )
}

// Growth Forecast
const GrowthForecast = () => {
  return (
    <div className="bg-gradient-to-br from-emerald-900/20 to-slate-900/50 rounded-xl p-5 border border-emerald-700/30">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        Growth Forecast
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-slate-400 text-sm">Monthly Growth</span>
          <span className="font-mono text-emerald-400">+15%</span>
        </div>
        <div className="text-xs text-slate-500 space-y-1">
          <p>Key growth areas in video production</p>
          <p>Projected Q3 Token OV: <span className="text-emerald-400">25B</span></p>
        </div>
        <div className="flex gap-1 items-end h-16">
          {[40, 52, 48, 61, 55, 70, 65, 78, 82, 95].map((h, i) => (
            <div 
              key={i}
              className="flex-1 bg-emerald-500/30 rounded-t transition-all duration-300 hover:bg-emerald-500/50"
              style={{ 
                height: `${h}%`,
                animationDelay: `${i * 50}ms`,
                animation: 'barGrow 0.5s ease-out forwards',
              }}
            />
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-slate-500">
          <span>Jan</span>
          <span>Current</span>
        </div>
      </div>
    </div>
  )
}

// Market Share Opportunity
const MarketShareOpp = () => {
  return (
    <div className="bg-gradient-to-br from-orange-900/20 to-slate-900/50 rounded-xl p-5 border border-orange-700/30">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
        Market Share Opportunity
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-slate-400 text-sm">Monthly Growth</span>
          <span className="font-mono text-orange-400">+12%</span>
        </div>
        <div className="text-xs text-slate-500 space-y-1">
          <p>Focus growth in video business</p>
          <p>Projected Q3 Token OV: <span className="text-orange-400">18B</span></p>
        </div>
      </div>
    </div>
  )
}

// Main Component
function TokenMap() {
  const { t } = useTranslation()
  const [companyName, setCompanyName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [mapData, setMapData] = useState<LayerData[] | null>(null)
  const [focusAreas, setFocusAreas] = useState<string[]>(['Vitality', 'Voice Saturation'])

  const handleGenerate = useCallback(() => {
    if (!companyName.trim()) return
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setMapData(generateMockData(companyName))
      setIsLoading(false)
    }, 1500)
  }, [companyName])

  const handleLayerToggle = (layerId: string) => {
    if (!mapData) return
    setMapData(mapData.map(layer => 
      layer.id === layerId ? { ...layer, expanded: !layer.expanded } : layer
    ))
  }

  const handleCategoryToggle = (layerId: string, categoryId: string) => {
    if (!mapData) return
    setMapData(mapData.map(layer => 
      layer.id === layerId ? {
        ...layer,
        categories: layer.categories.map(cat =>
          cat.id === categoryId ? { ...cat, expanded: !cat.expanded } : cat
        )
      } : layer
    ))
  }

  const handleUpdateUseCase = (layerId: string, useCaseId: string, tokens: number) => {
    if (!mapData) return
    setMapData(mapData.map(layer => 
      layer.id === layerId ? {
        ...layer,
        categories: layer.categories.map(cat => ({
          ...cat,
          useCases: cat.useCases.map(uc =>
            uc.id === useCaseId ? { ...uc, tokens } : uc
          )
        }))
      } : layer
    ))
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse-slow animation-delay-4000" />
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1800px] mx-auto p-6">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent">
                Token Battle Map
              </h1>
              <p className="text-slate-400 mt-1">Token业务白板图 — Strategic Opportunity Mapping</p>
            </div>
            
            {/* Provider legend */}
            <div className="flex items-center gap-4">
              {Object.entries(PROVIDERS).slice(0, 5).map(([key, prov]) => (
                <div key={key} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: prov.color, boxShadow: `0 0 8px ${prov.glow}` }}
                  />
                  <span className="text-xs text-slate-400">{prov.name}</span>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Search/Generate Section */}
        <div className="mb-8 bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-2xl p-6 border border-slate-700/30 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                placeholder="Enter company name to generate Token Battle Map..."
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                <kbd className="px-2 py-1 bg-slate-800 rounded text-xs border border-slate-700">Enter</kbd>
              </div>
            </div>
            <button
              onClick={handleGenerate}
              disabled={isLoading || !companyName.trim()}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold text-white hover:from-cyan-400 hover:to-blue-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-cyan-500/25"
            >
              {isLoading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Analyzing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Generate Map
                </>
              )}
            </button>
          </div>
          
          {/* Focus Areas */}
          {mapData && (
            <div className="mt-4 flex items-center gap-4">
              <span className="text-sm text-slate-400">Key Focus Areas:</span>
              <div className="flex gap-2">
                {focusAreas.map((area, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full text-sm text-amber-400"
                  >
                    🎯 {area}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        {mapData ? (
          <div className="grid grid-cols-12 gap-6">
            {/* Left: Main Map */}
            <div className="col-span-9">
              {mapData.map((layer, index) => (
                <LayerCard
                  key={layer.id}
                  layer={layer}
                  onToggle={() => handleLayerToggle(layer.id)}
                  onCategoryToggle={(catId) => handleCategoryToggle(layer.id, catId)}
                  onUpdateUseCase={(ucId, tokens) => handleUpdateUseCase(layer.id, ucId, tokens)}
                  layerIndex={index}
                />
              ))}
            </div>
            
            {/* Right: Stats Panel */}
            <div className="col-span-3 space-y-6">
              {/* Provider Distribution */}
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-5 border border-slate-700/30">
                <h3 className="text-lg font-bold text-white mb-4">Provider Distribution</h3>
                <ProviderChart data={mapData} />
              </div>
              
              <AIGatewayStats data={mapData} />
              <GrowthForecast />
              <MarketShareOpp />
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative w-32 h-32 mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-20 animate-ping" />
              <div className="absolute inset-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-40 animate-pulse" />
              <div className="absolute inset-4 bg-slate-900 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Generate Your Token Battle Map</h2>
            <p className="text-slate-400 text-center max-w-md">
              Enter a company name above to analyze their token consumption patterns and identify strategic opportunities across AI providers.
            </p>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes cardSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes layerSlideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes barGrow {
          from {
            transform: scaleY(0);
            transform-origin: bottom;
          }
          to {
            transform: scaleY(1);
            transform-origin: bottom;
          }
        }
      `}</style>
    </div>
  )
}

export default TokenMap
