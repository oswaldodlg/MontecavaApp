import React, {useState, useEffect} from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem, { useTreeItem } from '@mui/lab/TreeItem';



export default function IconExpansionTreeView({setCurrentDocView, subscription}) {

  const [sub, setSub] = useState(null)

  useEffect(() => {
    setSub(subscription.subscriptionData)
  }, [subscription])

  return (
    <>
    {sub &&
    <TreeView
      aria-label="icon expansion"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ minHeight: 240, flexGrow: 1, maxWidth: 400, 
        //overflowY: 'auto' 
        }}
      onNodeSelect={(e, node) => {
        setCurrentDocView(node)
      }}
    >
   
      <TreeItem 
      nodeId="1" 
      label="Declaraciones">
        <TreeItem 
        nodeId="mensuales" 
        label="Mensuales"
        disabled= {sub.term === 'Bimestral'} 
        />
        <TreeItem 
        nodeId="bimestrales" 
        label="Bimestrales" 
        disabled={sub.term !== 'Bimestral'}
        />
        <TreeItem 
        nodeId="anuales" 
        label="Anuales"
        disabled={sub.term !== 'Anual'} 
        />
      </TreeItem>
      <TreeItem 
      nodeId="Comprobantes" 
      label="Comprobantes"
      disabled={sub.term === 'Mensual' && sub.name === 'Principiante' } 
      >
        <TreeItem 
        nodeId="imss" 
        label="IMSS" 
        />
        <TreeItem 
        nodeId="afore" 
        label="AFORE"  
        />
        <TreeItem 
        nodeId="infonavit" 
        label="INFONAVIT" 
        />
        <TreeItem 
        nodeId="tesoreria" 
        label="TESORERIA" 
        />
      </TreeItem>
      <TreeItem 
      nodeId="estadosFinancieros" 
      label="Estados Financieros" 
      />
      <TreeItem nodeId="constanciaSitFiscal" 
      label="Constancia Situacion Fiscal" 
      disabled={sub.term === 'Bimestral'}
      />
      <TreeItem nodeId="opinion" 
      label="Opinión" 
      />
       <TreeItem nodeId="tablerosControl" 
      label="Tableros de Control"
      disabled= {sub.name !== ('Intermedio' || 'Avanzado' || 'Premium')}
      />
      <TreeItem nodeId="videoRetro" 
      label="Video de Retroalimentación"
      disabled={sub.name === ("Básico" || 'Principiante')} 
      />
    </TreeView>
    }
    </>
  );
}
